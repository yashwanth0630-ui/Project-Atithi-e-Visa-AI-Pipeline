/**
 * Client-Side PDF Parser and Canvas Image Renderer for Project Atithi
 * Extracts readable text streams and renders the first page as an image
 * so users don't see binary gibberish and GPT-4o Vision gets clean input.
 */

export interface ParsedPdfResult {
  text: string;
  pageCount: number;
  previewImageDataUrl?: string;
  error?: string;
}

export async function parsePdfFile(file: File): Promise<ParsedPdfResult> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    // Dynamic import to prevent SSR bundling issues
    const pdfjsLib = await import("pdfjs-dist");

    // Configure worker
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    }

    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdf = await loadingTask.promise;
    const pageCount = pdf.numPages;

    let fullText = "";

    // Extract text from all pages (up to first 5 pages)
    for (let pageNum = 1; pageNum <= Math.min(pageCount, 5); pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      if (pageText) {
        fullText += `[Page ${pageNum}]\n${pageText}\n\n`;
      }
    }

    // Render Page 1 to HTML5 Canvas for visual inspection & GPT-4o Vision
    let previewImageDataUrl: string | undefined = undefined;
    try {
      const page1 = await pdf.getPage(1);
      const viewport = page1.getViewport({ scale: 1.5 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      if (ctx) {
        await page1.render({
          canvasContext: ctx,
          viewport: viewport,
        }).promise;

        // Downscale to max 1200px width for serverless safety
        const maxDim = 1200;
        let finalCanvas = canvas;

        if (canvas.width > maxDim) {
          const scaledCanvas = document.createElement("canvas");
          const scale = maxDim / canvas.width;
          scaledCanvas.width = maxDim;
          scaledCanvas.height = canvas.height * scale;
          const sCtx = scaledCanvas.getContext("2d");
          sCtx?.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);
          finalCanvas = scaledCanvas;
        }

        previewImageDataUrl = finalCanvas.toDataURL("image/jpeg", 0.8);
      }
    } catch (renderErr) {
      console.warn("Could not render PDF preview image:", renderErr);
    }

    const cleanedText = fullText.trim();

    if (cleanedText.length > 0) {
      return {
        text: cleanedText,
        pageCount,
        previewImageDataUrl,
      };
    }

    // If PDF is a scanned image without a text layer, fallback to fallback text + image
    return {
      text: `[Scanned PDF Document: ${file.name}]\nVisual contents captured for GPT-4o Multimodal Vision OCR inspection.`,
      pageCount,
      previewImageDataUrl,
    };
  } catch (err: any) {
    console.warn("PDF.js parsing failed, falling back to text stream filter:", err);

    // Robust binary-to-text fallback: extract only printable ASCII/UTF-8 character sequences
    const uint8 = new Uint8Array(arrayBuffer);
    let extractedChars = "";
    let inTextStream = false;

    // Scan for text blocks inside PDF
    for (let i = 0; i < Math.min(uint8.length, 50000); i++) {
      const byte = uint8[i];
      // Printable ASCII range (space to ~) plus newlines
      if ((byte >= 32 && byte <= 126) || byte === 10 || byte === 13) {
        extractedChars += String.fromCharCode(byte);
      }
    }

    // Filter out PDF internal formatting syntax (%PDF, obj, endobj, stream, etc.)
    const cleanTokens = extractedChars
      .split(/\r?\n/)
      .filter((line) => {
        const l = line.trim();
        return (
          l.length > 3 &&
          !l.startsWith("%PDF") &&
          !l.startsWith("<<") &&
          !l.endsWith(">>") &&
          !l.includes("endobj") &&
          !l.includes("endstream") &&
          !l.includes("xref") &&
          !l.includes("Font")
        );
      })
      .join("\n")
      .slice(0, 1500);

    return {
      text: cleanTokens.length > 30
        ? `[Extracted Text from ${file.name}]\n${cleanTokens}`
        : `[Attached Travel PDF: ${file.name} - ${Math.round(file.size / 1024)} KB]\nItinerary & Hotel details ready for AI extraction.`,
      pageCount: 1,
    };
  }
}
