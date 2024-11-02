// src/App.tsx
import React, { useState, useCallback } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

 import FileUploader from "./fileile-uploader";
import FileList from "./filelist";


import Layout from "../../props/layout/layout";
import { ConversionService } from "./conversion-service";
import { ConversionFile } from "./conversion-file";

const PDFToWord: React.FC = () => {
  const [conversionFiles, setConversionFiles] = useState<ConversionFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const handleFilesAdded = useCallback((newFiles: ConversionFile[]) => {
    setConversionFiles((prev) => [...prev, ...newFiles]);
    setError(null);
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setConversionFiles((prev) => prev.filter((file) => file.id !== id));
  }, []);

  const handleConvertPDFToWord = useCallback(async () => {
    if (conversionFiles.length === 0) {
      setError("Please upload at least one PDF file");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const convertedFiles = await Promise.all(
        conversionFiles.map(async (file) => {
          try {
            // Update status to processing
            setConversionFiles((prev) =>
              prev.map((f) =>
                f.id === file.id ? { ...f, conversionStatus: "processing" } : f
              )
            );

            // Convert PDF to text
            const extractedText = await ConversionService.convertPDFToText(
              file.file
            );

            // Create Word file
            const wordFile = ConversionService.convertTextToWord(
              extractedText,
              file.name
            );

            // Update status to completed
            setConversionFiles((prev) =>
              prev.map((f) =>
                f.id === file.id
                  ? {
                      ...f,
                      conversionStatus: "completed",
                      convertedFile: wordFile,
                    }
                  : f
              )
            );

            return { ...file, convertedFile: wordFile };
          } catch (fileError) {
            // Update status to error for individual file
            setConversionFiles((prev) =>
              prev.map((f) =>
                f.id === file.id ? { ...f, conversionStatus: "error" } : f
              )
            );
            throw fileError;
          }
        })
      );
      console.error("convertedFiles ", convertedFiles);
    } catch (error) {
      console.error("Conversion Error:", error);
      setError(
        "Failed to convert PDF to Word. Some files may not have been processed."
      );
      setOpenErrorDialog(true);
    } finally {
      setIsProcessing(false);
    }
  }, [conversionFiles]);

  const handleDownloadFile = useCallback((file: ConversionFile) => {
    if (file.convertedFile) {
      ConversionService.downloadFile(file.convertedFile);
    }
  }, []);

  return (
    <Layout>
      {/* Breadcrumbs */}
      <Box sx={{ borderRadius: 2, borderColor: "#4caf50" }}>
        <Box
          py={0}
          px={4}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderColor: "#cddc39",
          }}
        >
          <Box width="100%">
            <Box width="100%">
              <Typography
                variant="h5"
                component="h1"
                my={1}
                fontWeight={400}
                sx={{ color: "#2BBBAD" }}
              >
                 PDF to Word Converter
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* widgets */}
        {/* //orange */}
        <Box px={3} sx={{ backgroundColor: "" }}>
          <Box width="100%">
            {/* pdftowprd */}
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
                  <Alert severity="error" onClose={() => setError(null)}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>
                </Box>
              )}

              {conversionFiles.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <FileList
                    files={conversionFiles}
                    onRemoveFile={handleRemoveFile}
                    onDownloadFile={handleDownloadFile}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, py: 1.5 }}
                    onClick={handleConvertPDFToWord}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Converting PDFs..." : "Convert to Word"}
                  </Button>
                </Box>
              )}

              <Dialog
                open={openErrorDialog}
                onClose={() => setOpenErrorDialog(false)}
              >
                <DialogTitle>Conversion Incomplete</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Some PDF files could not be converted. This could be due to:
                    <ul>
                      <li>Complex PDF formatting</li>
                      <li>Scanned or image-based PDFs</li>
                      <li>Encrypted or protected PDFs</li>
                    </ul>
                    For best results, use clear, text-based PDFs.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpenErrorDialog(false)}
                    color="primary"
                  >
                    Understood
                  </Button>
                </DialogActions>
              </Dialog>
            </Container>
          </Box>
        </Box>
        {/* grey */}
        <Box py={20} px={3} sx={{ backgroundColor: "" }}>
          <Box width="100%"></Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default PDFToWord;
