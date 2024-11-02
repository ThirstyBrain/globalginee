  import React, { useCallback, useState } from 'react';
  import { 
    Box, 
    Typography, 
    Button, 
    Paper, 
    LinearProgress 
  } from '@mui/material';
  import { v4 as uuidv4 } from 'uuid';
  import CloudUploadIcon from '@mui/icons-material/CloudUpload';
  import { styled } from '@mui/material/styles';
import { PDFFile } from './pdffile';
  

  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
  interface FileUploaderProps {
    onFilesAdded: (files: PDFFile[]) => void;
    maxFiles?: number;
    maxFileSize?: number;
  }
  
  const FileUploader: React.FC<FileUploaderProps> = ({ 
    onFilesAdded, 
    maxFiles = 15, 
    maxFileSize = 50 * 1024 * 1024 // 50MB 
  }) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
  
    const handleFileInput = useCallback((files: FileList) => {
      const validPDFFiles: PDFFile[] = Array.from(files)
        .filter(file => {
          // Validate file type and size
          const isValidType = file.type === 'application/pdf';
          const isValidSize = file.size <= maxFileSize;
          return isValidType && isValidSize;
        })
        .map(file => ({
          file,
          id: uuidv4(),
          name: file.name,
          preview: URL.createObjectURL(file),
          size: file.size
        }));
  
      // Limit total number of files
      const finalFiles = validPDFFiles.slice(0, maxFiles);
  
      if (finalFiles.length > 0) {
        onFilesAdded(finalFiles);
        setUploadProgress(100);
        setTimeout(() => setUploadProgress(0), 1000);
      }
    }, [onFilesAdded, maxFiles, maxFileSize]);
  
    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    }, []);
  
    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      if (e.dataTransfer.files) {
        handleFileInput(e.dataTransfer.files);
      }
    }, [handleFileInput]);
  
    return (
      <Paper 
        variant="outlined"
        sx={{ 
          p: 3, 
          textAlign: 'center', 
          border: '2px dashed', 
          borderColor: dragActive ? 'primary.main' : 'grey.400',
          backgroundColor: dragActive ? 'primary.light' : 'background.default'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ mb: 2 }}
        >
          Upload PDF Files
          <VisuallyHiddenInput 
            type="file" 
            accept=".pdf" 
            multiple 
            onChange={(e) => e.target.files && handleFileInput(e.target.files)}
          />
        </Button>
  
        <Typography variant="body2" color="text.secondary">
          Drag & Drop PDF Files or Click to Upload
        </Typography>
  
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Max {maxFiles} files, {maxFileSize / 1024 / 1024}MB per file
        </Typography>
  
        {uploadProgress > 0 && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}
      </Paper>
    );
  };
  
  export default FileUploader;
