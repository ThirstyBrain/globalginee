// App.tsx
// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Grid,
//   Typography,
//   CircularProgress,
//   Box,
// } from "@mui/material";
// import ProductCard from "./product-card";
// import FilterPanel from "./filter-panel";
// import ProductModal from "./product-modal";
// import Layout from "../../props/layout/layout";
// import { FilterOptions, Product } from "./models";

// const MakeupProduct: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [filters, setFilters] = useState<FilterOptions>({
//     search: "",
//     brand: "",
//     productType: "",
//     minPrice: 0,
//     maxPrice: 1000,
//   });

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           "http://makeup-api.herokuapp.com/api/v1/products.json"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);


//   //[...new Set(products.map((p) => p.brand))].filter(Boolean);
//   const brands = products.reduce<string[]>((acc, product) => {
//                             if (product.brand && !acc.includes(product.brand)) {
//                                 acc.push(product.brand);
//                             }
//                             return acc;
//                         }, [])
//                         .sort(); 
//   //const productTypes = [...new Set(products.map((p) => p.product_type))].filter(Boolean);
//   const productTypes = products.reduce<string[]>((acc, product) => {
//                                     if (product.product_type && !acc.includes(product.product_type)) {
//                                         acc.push(product.product_type);
//                                     }
//                                     return acc;
//                                 }, [])
//                                 .sort();

//   const filteredProducts = products.filter((product) => {
//     const searchMatch =
//       product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
//       product.brand.toLowerCase().includes(filters.search.toLowerCase());
//     const brandMatch = !filters.brand || product.brand === filters.brand;
//     const priceMatch =
//       (!filters.minPrice || parseFloat(product.price) >= filters.minPrice) &&
//       (!filters.maxPrice || parseFloat(product.price) <= filters.maxPrice);

//     return searchMatch && brandMatch && priceMatch;
//   });

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Layout>
//       {/* Breadcrumbs */}
//       <Box sx={{ borderRadius: 2, borderColor: "#4caf50" }}>
//         <Box
//           py={0}
//           px={4}
//           sx={{
//             backgroundColor: "#fff",
//             borderRadius: 2,
//             borderBottomLeftRadius: 0,
//             borderBottomRightRadius: 0,
//             borderColor: "#cddc39",
//           }}
//         >
//           <Box width="100%">
//             <Box width="100%">
//               <Typography
//                 variant="h5"
//                 component="h1"
//                 my={1}
//                 fontWeight={400}
//                 sx={{ color: "#2BBBAD" }}
//               >
//                 Makeup Products
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//         <Box px={0} sx={{ backgroundColor: "" }}>
//           <Box width="100%">
//             <Container maxWidth="xl" sx={{ py: 4 }}>
//               <Typography variant="h4" component="h1" gutterBottom></Typography>

//               <FilterPanel
//                 filters={filters}
//                 brands={brands}
//                 productTypes={productTypes}
//                 onFilterChange={setFilters}
//               />

//               <Grid container spacing={3}>
//                 {filteredProducts.map((product) => (
//                   <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//                     <ProductCard
//                       product={product}
//                       onClick={() => setSelectedProduct(product)}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>

//               <ProductModal
//                 product={selectedProduct}
//                 open={!!selectedProduct}
//                 onClose={() => setSelectedProduct(null)}
//               />
//             </Container>
//           </Box>
//         </Box>
//       </Box>
//     </Layout>
//   );
// };

// export default MakeupProduct;



// App.tsx
import React, { useState, useCallback } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import ProductCard from "./product-card";
import FilterPanel from "./filter-panel";
import ProductModal from "./product-modal";
import Layout from "../../props/layout/layout";
import { FilterOptions, Product } from "./models";
//import ProductCard from './components/ProductCard';
import LoadingProductCard from './loading-product-card';
//import FilterPanel from './components/FilterPanel';
//import ProductModal from './components/ProductModal';
import { useProducts } from './hooks/useProducts';
import debounce from 'lodash/debounce';

const MakeupProduct: React.FC = () => {
  const { products, loading, error, hasMore, loadMore } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    brand: '',
    productType: '',
    minPrice: 0,
    maxPrice: 1000,
  });
  const [showError, setShowError] = useState(false);

  const brands = Array.from(
    new Set(products.map((p) => p.brand))
  ).filter((brand): brand is string => Boolean(brand));

  const productTypes = Array.from(
    new Set(products.map((p) => p.product_type))
  ).filter((type): type is string => Boolean(type));

  // Debounced filter function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilter = useCallback(
    debounce((newFilters: FilterOptions) => {
      setFilters(newFilters);
    }, 300),
    []
  );

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.brand.toLowerCase().includes(filters.search.toLowerCase());
    const brandMatch = !filters.brand || product.brand === filters.brand;
    const priceMatch = (!filters.minPrice || parseFloat(product.price) >= filters.minPrice) &&
      (!filters.maxPrice || parseFloat(product.price) <= filters.maxPrice);
    
    return searchMatch && brandMatch && priceMatch;
  });

  // Intersection Observer for infinite scroll
  const lastProductRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.observe(node);
  }, [loading, hasMore, loadMore]);

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
              Makeup Products
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box px={0} sx={{ backgroundColor: "" }}>
        <Box width="100%">
        <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Makeup Products
      </Typography>
      
      <FilterPanel
        filters={filters}
        brands={brands}
        productTypes={productTypes}
        onFilterChange={debouncedFilter}
      />

      <Grid container spacing={3}>
        {filteredProducts.map((product, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={product.id}
            ref={index === filteredProducts.length - 1 ? lastProductRef : undefined}
          >
            <ProductCard
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          </Grid>
        ))}
        
        {loading && [...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
            <LoadingProductCard />
          </Grid>
        ))}
      </Grid>

      {!loading && !hasMore && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography>No more products to load</Typography>
        </Box>
      )}

      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <Snackbar
        open={!!error || showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error" onClose={() => setShowError(false)}>
          {error || 'An error occurred while loading products'}
        </Alert>
      </Snackbar>
    </Container>
        </Box>
      </Box>
    </Box>
  </Layout>


  );
};

export default MakeupProduct;