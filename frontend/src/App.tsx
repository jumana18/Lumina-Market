import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import { setProducts, setLoading, setError } from './redux/slices/productSlice';
import api from './services/api';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/App.Routes';


function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 3000;

    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        if (Array.isArray(data)) {
          dispatch(setProducts(data));
        } else if (typeof data === 'string' && (data.trim().startsWith('<') || data.toLowerCase().includes('<!doctype html>')) && retryCount < maxRetries) {
          console.log(`Server still starting up (received HTML), retrying in ${retryDelay}ms... (${retryCount + 1}/${maxRetries})`);
          retryCount++;
          setTimeout(fetchProducts, retryDelay);
        } else {
          console.error('API returned non-array data for products:', data);
          dispatch(setError('Invalid data format received from server'));
        }
      } catch (err: any) {
        // If it's a 503, it might be the DB still connecting, but the server is up
        if (err.response?.status === 503 && retryCount < maxRetries) {
          console.log(`Database still connecting (503), retrying in ${retryDelay}ms... (${retryCount + 1}/${maxRetries})`);
          retryCount++;
          setTimeout(fetchProducts, retryDelay);
        } else {
          dispatch(setError(err.message || 'Failed to fetch products'));
        }
      }
    };

    if (status === 'idle') {
      dispatch(setLoading(true));
      fetchProducts();
    }
  }, [status, dispatch]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#FDFCFB] text-[#1A1A1A]">
    
        <Navbar />
       <main className="flex-grow">
  
  <AppRoutes />
</main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
