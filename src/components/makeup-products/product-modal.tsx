// ProductModal.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { Product } from './models';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image_link}
              alt={product.name}
              style={{ width: '100%', height: 'auto' }}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {product.brand}
            </Typography>
            <Typography variant="body1" paragraph>
              Price: ${product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              Category: {product.category}
            </Typography>
            <Typography variant="body1" paragraph>
              Product Type: {product.product_type}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;