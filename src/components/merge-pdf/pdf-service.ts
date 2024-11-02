// src/services/PDFService.ts
import { PDFDocument } from 'pdf-lib';

export class PDFService {
  static async mergePDFs(files: File[]): Promise<Uint8Array> {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    return await mergedPdf.save();
  }

  static downloadPDF(pdfBytes: Uint8Array, filename: string = 'merged.pdf') {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}