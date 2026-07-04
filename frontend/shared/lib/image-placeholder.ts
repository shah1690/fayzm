function toBase64(value: string) {
  if (typeof window === "undefined") {
    return Buffer.from(value).toString("base64");
  }

  return window.btoa(value);
}

export function shimmerDataUrl(width = 1200, height = 800) {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer-base" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#EEF2F6" />
          <stop offset="50%" stop-color="#F8FAFC" />
          <stop offset="100%" stop-color="#EEF2F6" />
        </linearGradient>
        <linearGradient id="shimmer-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(255,255,255,0)" />
          <stop offset="50%" stop-color="rgba(255,255,255,0.9)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#shimmer-base)" />
      <rect width="${Math.ceil(width / 2)}" height="${height}" fill="url(#shimmer-wave)">
        <animate attributeName="x" from="-${Math.ceil(width / 2)}" to="${width}" dur="1.3s" repeatCount="indefinite" />
      </rect>
    </svg>`;

  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

export function shimmerImageProps(width?: number, height?: number) {
  return {
    placeholder: "blur" as const,
    blurDataURL: shimmerDataUrl(width, height),
  };
}
