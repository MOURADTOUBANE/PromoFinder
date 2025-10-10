'use client';
import { useState, useEffect } from 'react';
import Navbar from "@/component/nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFilter, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Styles from "../css/deals.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import {useUser} from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

export default function Deals() {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSite, setSelectedSite] = useState('Ali Express'); 
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minDiscount, setMinDiscount] = useState(0);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const {user} = useUser();
    const router = useRouter();

    useEffect(() => {
        fetchProducts('deals', 1, true);
    }, [selectedCategory, minDiscount]); 

    const fetchProducts = async (keyword = 'deals', pageNum = 1, reset = false) => {
        try {
            setLoading(true);
            const query = new URLSearchParams({
                keyword,
                page: pageNum,
                category: selectedCategory,
                minDiscount: minDiscount.toString()
            });

            const response = await fetch(`/api/search/aliExpress?${query.toString()}`);
            const data = await response.json();

            if (data.success) {
                const newProducts = data.products || [];
                if (reset) {
                    setProducts(newProducts);
                } else {
                    setProducts(prev => [...prev, ...newProducts]);
                }

                setHasMore(newProducts.length > 0);
                setPage(pageNum);
            } else {
                if (reset) setProducts([]);
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (selectedSite === 'Ali Express' || selectedSite === 'All Sites') {
            fetchProducts(searchTerm || 'deals', 1, true);
        }
    };

    const toggleMobileFilter = () => {
        setIsMobileFilterOpen(!isMobileFilterOpen);
    };

    const renderProducts = () => {
        if (loading && products.length === 0) {
            return (
                <div className={Styles.loadingContainer}>
                    <FontAwesomeIcon icon={faSpinner} className={Styles.spinner} />
                    <p>loading...</p>
                </div>
            );
        }

        if (products.length === 0) {
            return (
                <div className={Styles.noProducts}>
                    <h3>No products found</h3>
                    <p>Try using another keyword or change filters.</p>
                </div>
            );
        }

   

    const checkIsUserInable = async (product) => {
  if (!user) {
    router.push("/signIn");
    return;
  }

    const res= await fetch("/api/favorites", {
    method: "POST",
    cache:"no-store",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ userId: user.id,product }),
  });

    const data = await res.json();
  if (data.success) {
    toast.success("Product added to favorites!"); 
    
  }

};

        return (
            <InfiniteScroll
                dataLength={products.length}
                next={() => fetchProducts(searchTerm || 'deals', page + 1)}
                hasMore={hasMore}
                loader={
                    <div className={Styles.loadingContainer}>
                        <FontAwesomeIcon icon={faSpinner} className={Styles.spinner} />
                        <p>loading more...</p>
                    </div>
                }
                endMessage={<p style={{ textAlign: "center" }}>No more products.</p>}
            >
                <div className={Styles.productsGrid}>
                    {products.map((product) => (
                        <div key={product.productId || product.id} className={Styles.productCard}>
                            <div className={Styles.productImage}>
                                <img
                                    src={product.image || product.imageUrl}
                                    alt={product.title}
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder.jpg';
                                    }}
                                />
                                {product.discount && (
                                    <span className={Styles.discountBadge}>
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>

                            <div className={Styles.productInfo}>
                                <h3 className={Styles.productTitle}>{product.title}</h3>

                                <div className={Styles.priceSection}>
                                    <span className={Styles.currentPrice}>
                                        {product.price} {product.currency || 'USD'}
                                    </span>
                                    {product.originalPrice && (
                                        <span className={Styles.originalPrice}>
                                            {product.originalPrice} {product.currency || 'USD'}
                                        </span>
                                    )}
                                </div>

                                <div className={Styles.productMeta}>
                                    {product.rating && (
                                        <div className={Styles.rating}>
                                            ⭐ {product.rating}
                                            <span>({product.orders || 0})</span>
                                        </div>
                                    )}
                                </div>

                                <a
                                    href={product.productUrl || product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={Styles.buyButton}
                                >
                                    Buy Now
                                </a>
                            </div>
                            <button className={Styles.favButton} onClick={() => checkIsUserInable(product)}>add to favorite</button>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        );
    };

    const FilterContent = () => (
        <>
            <div className={Styles.filters}>
                <FontAwesomeIcon icon={faFilter} />
                <p>Filters</p>
            </div>

            <div className={Styles.FilterSites}>
                <p>Site</p>
                <select
                    value={selectedSite}
                    onChange={(e) => setSelectedSite(e.target.value)}
                >
                    <option value="All Sites">All Sites</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Ali Express">Ali Express</option>
                </select>
            </div>

            <div className={Styles.FilterCategory}>
                <p>Category</p>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="electronic">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="book">Books</option>
                </select>
            </div>

            <div className={Styles.filterSection}>
                <div className={Styles.filterLabel}>
                    Minimum Discount:
                </div>
                <div className={Styles.sliderContainer}>
                    <input
                        type="range"
                        min="0"
                        max="70"
                        value={minDiscount}
                        onChange={(e) => setMinDiscount(Number(e.target.value))}
                        className={Styles.customRange}
                    />
                    <div className={Styles.sliderLabels}>
                        <span>{minDiscount}%</span>
                        <span>70%</span>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className={Styles.hero}>
                <h1 className={Styles.title}>Find Amazing Deals</h1>
                <div className="container mt-4">
                    <form onSubmit={handleSearch} className={Styles.searchBar}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`form-control ${Styles.searchInput}`}
                            placeholder="Search for deals, products, or brand"
                        />
                        <button type="submit" className={Styles.searchButton}>
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Mobile Filter Button */}
            <button className={Styles.mobileFilterButton} onClick={toggleMobileFilter}>
                <FontAwesomeIcon icon={faFilter} />
                Filters
            </button>

            {/* Mobile Filter Overlay */}
            <div
                className={`${Styles.mobileFilterOverlay} ${isMobileFilterOpen ? Styles.show : ''}`}
                onClick={toggleMobileFilter}
            />

            {/* Mobile Filter Panel */}
            <div className={`${Styles.mobileFilterPanel} ${isMobileFilterOpen ? Styles.open : ''}`}>
                <div className={Styles.mobileFilterHeader}>
                    <h3>Filters</h3>
                    <button className={Styles.closeButton} onClick={toggleMobileFilter}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className={Styles.mobileFilterContent}>
                    <FilterContent />
                </div>
            </div>

            <div className="row">
                {/* Desktop Filter Sidebar */}
                <div className="col-md-3">
                    <div className={Styles.filterContainer}>
                        <FilterContent />
                    </div>
                </div>

                {/* Products Section */}
                <div className="col-md-9">
                    <div className={Styles.productsContainer}>
                        {renderProducts()}
                    </div>
                </div>
            </div>

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
        </>
    );
}
