// src/App.tsx
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Alert, 
  AlertTitle 
} from '@mui/material';
import { DropResult } from 'react-beautiful-dnd';
import { PDFFile } from './pdffile';
import { PDFService } from './pdf-service';
import FileUploader from '../merge-pdf/file-uploader';
import PDFList from '../merge-pdf/pdf-list';
import Layout from '../../props/layout/layout';


const PDFMerge: React.FC = () => {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesAdded = (newFiles: PDFFile[]) => {
    setPdfFiles(prev => [...prev, ...newFiles]);
    setError(null);
  };

  const handleRemoveFile = (id: string) => {
    setPdfFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleReorderFiles = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedFiles = Array.from(pdfFiles);
    const [removed] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, removed);

    setPdfFiles(reorderedFiles);
  };

  const handleMergePDFs = async () => {
    if (pdfFiles.length < 2) {
      setError('Please add at least 2 PDF files');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const mergedPdfBytes = await PDFService.mergePDFs(
        pdfFiles.map(pdfFile => pdfFile.file)
      );
      PDFService.downloadPDF(mergedPdfBytes, 'merged.pdf');
      
      // Reset after successful merge
      setPdfFiles([]);
    } catch (error) {
      console.error('PDF Merge Error:', error);
      setError('Failed to merge PDFs. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (

    <Layout>
    {/* Breadcrumbs */}
    <Box sx={{borderRadius: 2,borderColor:"#4caf50"}}>
      <Box py={0} px={4} sx={{backgroundColor: "#fff",
                              borderRadius: 2,
                              borderBottomLeftRadius:0,
                              borderBottomRightRadius:0,
                              borderColor:"#cddc39"}}>
          <Box width="100%">
            <Box width="100%">
              <Typography variant="h5" component="h1" my={1} fontWeight={400} sx={{color:'#2BBBAD'}}>
              PDF Merger
              </Typography>
            </Box>
          </Box>
      </Box>
     {/* widgets */}
     {/* //orange */}
    <Box  px={3} sx={{backgroundColor: ""}}>
      <Box width="100%">
      <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center"
      >
        
      </Typography>

      <FileUploader onFilesAdded={handleFilesAdded} />

      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Box>
      )}

      {pdfFiles.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <PDFList 
            files={pdfFiles}
            onRemoveFile={handleRemoveFile}
            onReorderFiles={handleReorderFiles}
          />
          
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2, py: 1.5 }}
            onClick={handleMergePDFs}
            disabled={isProcessing}
          >
            {isProcessing ? 'Merging PDFs...' : 'Merge PDFs'}
          </Button>
        </Box>
      )}
    </Container>

      </Box>
    </Box>
    {/* grey */}
    <Box py={20} px={3} sx={{backgroundColor: ""}}>
      <Box width="100%">

      </Box>
    </Box>
    
  </Box>
</Layout>


  );
};

export default PDFMerge;
