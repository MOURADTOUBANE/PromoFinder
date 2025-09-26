'use client';
import FavProduct from '@/component/favProducts';
import { useState, useEffect } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('favoriteProduct');
    if (saved) {
      
      const parsed = JSON.parse(saved);
      const favs = Array.isArray(parsed) ? parsed : [parsed];
      setProducts(favs);
    }
  }, []);

  const handleRemove = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem('favoriteProduct', JSON.stringify(updated));
  };

  return (
    <div>
      <h2>Favorites</h2>
      {products.length > 0 ? (
        products.map((product) => (
          <FavProduct
            key={product.id ||  product.productId}
            productId={product.id}
            productTitle={product.title}
            productImage={product.image || product.imageUrl}
            productPrice={product.price}
            productCurrency={product.currency || 'USD'}
            productDiscount={product.discount}
            productOriginalPrice={product.originalPrice}
            productRating={product.rating}
            productOrders={product.orders}
            productUrl={product.productUrl || product.url}
            onRemove={handleRemove} 
          />
        ))
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
}
