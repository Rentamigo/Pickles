import React from 'react';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;