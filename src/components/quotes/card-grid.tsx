import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import data from '../../assets/data/quotes.json';
import ImgMediaCard from './imagemediacard';

interface Item {
  title: string;
  description: string;
  image: string;
}

const ITEMS_PER_PAGE = 9;

const CardGrid: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(data);
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedItems = items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      <Grid container spacing={2}>
        {paginatedItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ImgMediaCard title={item.title} description={item.description} image={item.image} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(items.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handleChange}
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default CardGrid;
