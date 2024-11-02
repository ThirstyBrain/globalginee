  // hooks/useProducts.ts
  import { useState, useEffect } from 'react';
import { Product } from '../models';
  
  const CACHE_KEY = 'makeup-products-cache';
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
  
  interface CacheData {
    timestamp: number;
    products: Product[];
  }
  
  export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const productsPerPage = 20;
  
    const checkCache = (): Product[] | null => {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, products } = JSON.parse(cached) as CacheData;
        if (Date.now() - timestamp < CACHE_DURATION) {
          return products;
        }
        localStorage.removeItem(CACHE_KEY);
      }
      return null;
    };
  
    const updateCache = (products: Product[]) => {
      const cacheData: CacheData = {
        timestamp: Date.now(),
        products,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    };
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          
          // Check cache first
          const cachedProducts = checkCache();
          if (cachedProducts) {
            setProducts(cachedProducts);
            setLoading(false);
            return;
          }
  
          const controller = new AbortController();
          const signal = controller.signal;
  
          const response = await fetch(
            'http://makeup-api.herokuapp.com/api/v1/products.json',
            { signal }
          );
  
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
  
          const data = await response.json();
          setProducts(data);
          updateCache(data);
  
        } catch (err) {
          if (err instanceof Error && err.name === 'AbortError') {
            return;
          }
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  
    const paginatedProducts = products.slice(0, page * productsPerPage);
    const loadMore = () => {
      if ((page + 1) * productsPerPage >= products.length) {
        setHasMore(false);
      }
      setPage(prev => prev + 1);
    };
  
    return { products: paginatedProducts, loading, error, hasMore, loadMore };
  };
  
  