// FilterPanel.tsx
import React from 'react';
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { FilterOptions } from './models';

interface FilterPanelProps {
  filters: FilterOptions;
  brands: string[];
  productTypes: string[];
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  brands,
  productTypes,
  onFilterChange,
}) => {
  const handleChange = (field: keyof FilterOptions, value: string | number) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select
              value={filters.brand}
              label="Brand"
              onChange={(e) => handleChange('brand', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="number"
            label="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="number"
            label="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};


export default FilterPanel;