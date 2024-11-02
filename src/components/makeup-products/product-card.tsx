
  // ProductCard.tsx
  import React from 'react';
  import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
  } from '@mui/material';
import { Product } from './models';
  
  interface ProductCardProps {
    product: Product;
    onClick: () => void;
  }
  
  const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea onClick={onClick}>
          <CardMedia
            component="img"
            height="200"
            image={product.image_link}
            alt={product.name}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = '/placeholder-image.jpg';
            }}
          />
          <CardContent>
            <Typography variant="h6" component="div" noWrap>
              {product.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {product.brand}
            </Typography>
            <Typography variant="body1" color="primary">
              ${product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  export default ProductCard;
  
    
    
 