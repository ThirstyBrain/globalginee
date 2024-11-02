// components/LoadingProductCard.tsx
import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const LoadingProductCard: React.FC = () => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" height={32} />
        <Skeleton variant="text" height={24} />
        <Skeleton variant="text" width={80} />
      </CardContent>
    </Card>
  );
};

export default LoadingProductCard;

