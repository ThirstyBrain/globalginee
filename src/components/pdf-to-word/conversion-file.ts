export interface ConversionFile {
    id: string;
    file: File;
    name: string;
    size: number;
    preview: string;
    conversionStatus?: 'pending' | 'processing' | 'completed' | 'error';
    convertedFile?: File;
  }