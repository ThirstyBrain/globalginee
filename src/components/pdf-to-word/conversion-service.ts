// src/services/ConversionService.ts


import { getDocument } from 'pdfjs-dist';
//import mammoth from 'mammoth';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
//import { getDocument, TextItem } from 'pdfjs-dist/types/display/api';
//import type { TextItem } from 'pdfjs-dist/types/src/display/api';

export class ConversionService {
  // Client-side PDF to text conversion (limited accuracy)
  static async convertPDFToText(pdfFile: File): Promise<string> {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const typedArray = new Uint8Array(arrayBuffer);
    const pdf = await getDocument({ data: typedArray }).promise;
    
     let extractedText = '';
     const pageCount = pdf.numPages;

    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      extractedText += textContent.items
        .filter((item): item is TextItem => 'str' in item)  // Type guard to check if item has 'str'
        .map((item) => item.str)
        .join(' ') + '\n';
    }



    return extractedText;
  }

  // Convert text to Word document
  static convertTextToWord(text: string, filename: string): File {
    const blob = new Blob([text], { type: 'text/plain' });
    return new File([blob], filename.replace('.pdf', '.docx'), { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  }

  // Download file
  static downloadFile(file: File) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
