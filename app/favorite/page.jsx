'use client';
import FavProduct from '@/component/favProducts';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Style from '../css/favorites.module.css'
import { ToastContainer, toast } from 'react-toastify';


export default function Products() {
  const {user} = useUser();
  const [products, setProducts] = useState([]);

  const fetchFavorites = async () => {
    const res = await fetch(`/api/favorites?userId=${user.id}`);
    const data = await res.json();
    console.log(data)
    setProducts(data);
  };

  useEffect(() => {
  if (!user) return; 
  fetchFavorites();
}, [user]);

  const removeFavorite = async (productId) => {
    await fetch(`/api/favorites/${productId}?userId=${user.id}`, {
      method: "POST",
    });
    fetchFavorites();
    toast.info("product deleted!")
  };

  return (
    <div className={Style.main}>
     {products.length > 0 ? (
  products.map((product) => (
    <FavProduct
      key={product.productId} 
      productId={product.productId}
      productTitle={product.productTitle}
      productImage={product.productImage || "/images/placeholder.jpg"}
      productPrice={product.productPrice}
      productCurrency={product.productCurrency || "USD"}
      productDiscount={product.productDiscount || "0%"}
      productOriginalPrice={product.productOriginalPrice}
      productRating={product.productRating || 0}
      productOrders={product.productOrders || 0}
      productUrl={product.productUrl || "#"}
      onRemove={removeFavorite}
    />
  ))
) : (
  <p>No favorites yet.</p>
)}

     <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            style={{
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                                width: "fit-content"
                              }}
                            />
    </div>
  );
}
