// src/components/FileList.tsx
import React from 'react';
import { 
  List, 
  ListItem, 
  IconButton, 
  Typography, 
  Box, 
  LinearProgress,
  Chip
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { ConversionFile } from './conversion-file';

interface FileListProps {
  files: ConversionFile[];
  onRemoveFile: (id: string) => void;
  onDownloadFile: (file: ConversionFile) => void;
}

const FileList: React.FC<FileListProps> = ({ 
  files, 
  onRemoveFile,
  onDownloadFile
}) => {
  const getStatusColor = (status?: ConversionFile['conversionStatus']) => {
    switch (status) {
      case 'pending': return 'default';
      case 'processing': return 'primary';
      case 'completed': return 'success';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  return (
    <List sx={{ 
      maxHeight: 400, 
      overflow: 'auto', 
      border: '1px solid', 
      borderColor: 'grey.300', 
      borderRadius: 1 
    }}>
      {files.map((file) => (
        <ListItem
          key={file.id}
          secondaryAction={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {file.conversionStatus === 'completed' && (
                <IconButton 
                  color="success" 
                  onClick={() => onDownloadFile(file)}
                  sx={{ mr: 1 }}
                >
                  <CheckCircleIcon />
                </IconButton>
              )}
              <IconButton 
                edge="end" 
                onClick={() => onRemoveFile(file.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          }
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ flex: 1, mr: 2 }} noWrap>
                {file.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            </Box>
            
            {file.conversionStatus === 'processing' && (
              <LinearProgress color="primary" />
            )}
            
            {file.conversionStatus && (
              <Chip 
                size="small"
                label={file.conversionStatus}
                color={getStatusColor(file.conversionStatus)}
                variant="outlined"
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  );
};


export default FileList;