'use client';
import { useState } from 'react';
import Navbar from "@/component/nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import Styles from "../css/deals.module.css";

export default function Deals() {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const toggleMobileFilter = () => {
        setIsMobileFilterOpen(!isMobileFilterOpen);
    };

    const FilterContent = () => (
        <>
            <div className={Styles.filters}>
                <FontAwesomeIcon icon={faFilter} />
                <p>Filters</p>
            </div>

            <div className={Styles.FilterSites}>
                <p>Site</p>
                <select>
                    <option value="All Sites">All Sites</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Ali Express">Ali Express</option>
                </select>
            </div>

            <div className={Styles.FilterCategory}>
                <p>Category</p>
                <select>
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
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
                        className={Styles.customRange}
                    />
                    <div className={Styles.sliderLabels}>
                        <span>0%</span>
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
                    <div className={Styles.searchBar}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={Styles.searchIcon} />
                        <input
                            type="text"
                            className={`form-control ${Styles.searchInput}`}
                            placeholder="Search for deals, products, or brand"
                        />
                    </div>
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
                    <div style={{ padding: '20px', minHeight: '500px' }}>
                        {/* Products content would go here */}
                        <h3>Products will be displayed here</h3>
                        <p>This is where your product listings will appear.</p>
                    </div>
                </div>
            </div>
        </>
    );
}