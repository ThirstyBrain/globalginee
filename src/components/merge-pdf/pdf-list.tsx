// src/components/PDFList.tsx
import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography, 
  Box 
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  DragHandle as DragHandleIcon 
} from '@mui/icons-material';
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DropResult 
} from 'react-beautiful-dnd';
import { PDFFile } from './pdffile';


interface PDFListProps {
  files: PDFFile[];
  onRemoveFile: (id: string) => void;
  onReorderFiles: (result: DropResult) => void;
}

const PDFList: React.FC<PDFListProps> = ({ 
  files, 
  onRemoveFile, 
  onReorderFiles 
}) => {
  return (
    <DragDropContext onDragEnd={onReorderFiles}>
      <Droppable droppableId="pdf-list">
        {(provided) => (
          <List 
            {...provided.droppableProps} 
            ref={provided.innerRef}
            sx={{ 
              maxHeight: 400, 
              overflow: 'auto', 
              border: '1px solid', 
              borderColor: 'grey.300', 
              borderRadius: 1 
            }}
          >
            {files.map((file, index) => (
              <Draggable 
                key={file.id} 
                draggableId={file.id} 
                index={index}
              >
                {(provided) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    sx={{ 
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                    secondaryAction={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ mr: 2 }}
                        >
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </Typography>
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
                    <IconButton 
                      {...provided.dragHandleProps} 
                      sx={{ mr: 2 }}
                    >
                      <DragHandleIcon />
                    </IconButton>
                    <ListItemText 
                      primary={file.name} 
                      primaryTypographyProps={{ noWrap: true }}
                    />
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PDFList;