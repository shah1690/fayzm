#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { basename } from "node:path";

function parseArgs(argv) {
  const args = argv.slice(2);
  const options = {
    filePath: "",
    fileName: "",
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (!arg.startsWith("--") && !options.filePath) {
      options.filePath = arg;
      continue;
    }

    if (arg === "--name") {
      options.fileName = args[index + 1] ?? "";
      index += 1;
    }
  }

  if (!options.filePath) {
    throw new Error(
      "Usage: node scripts/upload-drive-pdf.mjs <pdf-path> [--name file.pdf]",
    );
  }

  return options;
}

function getAccessToken() {
  return execFileSync(
    "gcloud",
    ["auth", "application-default", "print-access-token"],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    },
  ).trim();
}

async function startResumableUpload(accessToken, fileName, fileSize) {
  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true&fields=id,name,resourceKey,webViewLink,webContentLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Length": String(fileSize),
        "X-Upload-Content-Type": "application/pdf",
      },
      body: JSON.stringify({
        mimeType: "application/pdf",
        name: fileName,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to start upload: ${response.status} ${await response.text()}`,
    );
  }

  const uploadUrl = response.headers.get("location");

  if (!uploadUrl) {
    throw new Error("Drive did not return a resumable upload URL.");
  }

  return uploadUrl;
}

async function uploadFileBytes(uploadUrl, accessToken, filePath, fileSize) {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    duplex: "half",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Length": String(fileSize),
      "Content-Type": "application/pdf",
    },
    body: createReadStream(filePath),
  });

  if (!response.ok) {
    throw new Error(
      `Upload failed: ${response.status} ${await response.text()}`,
    );
  }

  return response.json();
}

async function makeFilePublic(accessToken, fileId) {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}/permissions?supportsAllDrives=true`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        role: "reader",
        type: "anyone",
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to set public permission: ${response.status} ${await response.text()}`,
    );
  }
}

async function fetchFileMetadata(accessToken, fileId) {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?supportsAllDrives=true&fields=id,name,resourceKey,webViewLink,webContentLink`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch metadata: ${response.status} ${await response.text()}`,
    );
  }

  return response.json();
}

async function main() {
  const { filePath, fileName } = parseArgs(process.argv);
  const finalName = fileName || basename(filePath);
  const accessToken = getAccessToken();
  const fileStats = await stat(filePath);

  console.error(
    `Starting Drive upload for ${finalName} (${fileStats.size} bytes)`,
  );

  const uploadUrl = await startResumableUpload(
    accessToken,
    finalName,
    fileStats.size,
  );
  const uploadedFile = await uploadFileBytes(
    uploadUrl,
    accessToken,
    filePath,
    fileStats.size,
  );

  await makeFilePublic(accessToken, uploadedFile.id);

  const metadata = await fetchFileMetadata(accessToken, uploadedFile.id);

  console.log(
    JSON.stringify(
      {
        ...metadata,
        documentConfig: {
          slug: finalName,
          driveFileId: metadata.id,
          ...(metadata.resourceKey
            ? { resourceKey: metadata.resourceKey }
            : {}),
          downloadFileName: finalName,
        },
        documentConfigSnippet: `{
  slug: "${finalName}",
  driveFileUrl: "${metadata.webViewLink}",
  downloadFileName: "${finalName}",
},`,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
