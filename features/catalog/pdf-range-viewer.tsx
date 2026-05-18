"use client";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import { useEffect, useMemo, useRef, useState } from "react";
import "pdfjs-dist/web/pdf_viewer.css";

type Props = Readonly<{
  pdfUrl: string;
  title: string;
}>;

type RenderedPage = {
  height: number;
  pageNumber: number;
  width: number;
};

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url,
).toString();

const renderScale = 1.15;
const rangeChunkSize = 256 * 1024;

export function PdfRangeViewer({ pdfUrl, title }: Props) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(() => new Set());
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadingTask = getDocument({
      disableAutoFetch: true,
      disableRange: false,
      disableStream: false,
      rangeChunkSize,
      url: pdfUrl,
      withCredentials: false,
    });

    loadingTask.promise
      .then((loadedPdf) => {
        if (cancelled) {
          loadedPdf.destroy();
          return;
        }

        setPdf(loadedPdf);
        setPageCount(loadedPdf.numPages);
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setError(
            reason instanceof Error ? reason.message : "PDF failed to load",
          );
        }
      });

    return () => {
      cancelled = true;
      loadingTask.destroy();
    };
  }, [pdfUrl]);

  const pages = useMemo(
    () => Array.from({ length: pageCount }, (_, index) => index + 1),
    [pageCount],
  );

  return (
    <main className="min-h-screen bg-[#f3eee8] text-[#102033]">
      <div className="sticky top-0 z-20 border-black/10 border-b bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <h1 className="font-black text-base tracking-tight md:text-xl">
              {title}
            </h1>
            <p className="text-[#667085] text-xs md:text-sm">
              Chunked PDF viewer · {loadedPages.size}/{pageCount || "..."} pages
            </p>
          </div>
          <a
            className="rounded-full bg-[#003566] px-4 py-2 font-bold text-sm text-white"
            href={pdfUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            PDF
          </a>
        </div>
      </div>

      {error ? (
        <div className="mx-auto max-w-3xl p-6 text-red-700">{error}</div>
      ) : null}

      {!pdf && !error ? (
        <div className="flex min-h-[60vh] items-center justify-center font-bold text-[#003566]">
          Opening catalog...
        </div>
      ) : null}

      <div
        ref={containerRef}
        className="mx-auto flex max-w-5xl flex-col gap-4 p-2 md:p-6"
      >
        {pdf
          ? pages.map((pageNumber) => (
              <LazyPdfPage
                key={pageNumber}
                container={containerRef.current}
                onRendered={(page) =>
                  setLoadedPages((current) =>
                    new Set(current).add(page.pageNumber),
                  )
                }
                pageNumber={pageNumber}
                pdf={pdf}
              />
            ))
          : null}
      </div>
    </main>
  );
}

type LazyPageProps = Readonly<{
  container: HTMLDivElement | null;
  onRendered: (page: RenderedPage) => void;
  pageNumber: number;
  pdf: PDFDocumentProxy;
}>;

function LazyPdfPage({
  container,
  onRendered,
  pageNumber,
  pdf,
}: LazyPageProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [visible, setVisible] = useState(pageNumber <= 2);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const target = wrapperRef.current;

    if (!target || visible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        root: container,
        rootMargin: "1400px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [container, visible]);

  useEffect(() => {
    if (!visible || rendered) {
      return;
    }

    let cancelled = false;
    let cleanup = () => {};

    pdf.getPage(pageNumber).then((page) => {
      if (cancelled) {
        return;
      }

      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const viewport = page.getViewport({ scale: renderScale });
      const context = canvas.getContext("2d", { alpha: false });

      if (!context) {
        return;
      }

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.aspectRatio = `${viewport.width} / ${viewport.height}`;

      const renderTask = page.render({
        canvas,
        canvasContext: context,
        viewport,
      });

      cleanup = () => renderTask.cancel();

      renderTask.promise
        .then(() => {
          if (!cancelled) {
            setRendered(true);
            onRendered({
              height: viewport.height,
              pageNumber,
              width: viewport.width,
            });
          }
        })
        .catch(() => {});
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [onRendered, pageNumber, pdf, rendered, visible]);

  return (
    <section
      ref={wrapperRef}
      className="min-h-[72vh] overflow-hidden rounded-xl bg-white shadow-[0_10px_35px_rgba(16,32,51,0.14)] md:rounded-2xl"
    >
      {!rendered ? (
        <div className="flex min-h-[72vh] items-center justify-center text-[#667085] text-sm">
          Page {pageNumber}
        </div>
      ) : null}
      <canvas
        ref={canvasRef}
        aria-label={`Page ${pageNumber}`}
        className={rendered ? "block h-auto w-full" : "hidden"}
      />
    </section>
  );
}
