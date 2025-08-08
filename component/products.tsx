'use client';
import Styles from "./css/products.module.css";
import SecondStyles from "./css/nav.module.css";
import { useState } from "react";

type ProductsProps = {
  results: any[];
  loading: boolean;
};

export default function Products({ results, loading }: ProductsProps) {
  const [selectedSite, setSelectedSite] = useState("All Sites");
   
  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!results.length) return <p className="text-center mt-4">No results found.</p>;

    const filteredResults = results.filter((item) => {
    if (selectedSite === "All Sites") return true;
   
    return item.link.toLowerCase().includes(selectedSite.toLowerCase().replace(' ', ''));
  });
  return (
    <>
    <h1 className={`mt-5 mb-5 ${Styles.title} ${SecondStyles.logo}`}>Products</h1>

    <div className="container mt-5">
      {/* Filter Placeholder */}
      <div className="row mb-4">
        <div className="col-12">
       
           <div className={`dropdown mb-5 ${Styles.dropdown}`}>
            <p >Filter Sites</p>
             <select
                className="form-select"
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
               >
              <option value="All Sites">All Sites</option>
              <option value="Amazon">Amazon</option>
              <option value="Ali Express">Ali Express</option>
              <option value="Temu">Temu</option>
              <option value="Jumia">Jumia</option>
             </select>
           </div>
          
        </div>
      </div>

      <div className="row">
        {filteredResults.map((item, i) => {
          const image = item.pagemap?.cse_image?.[0]?.src;
          const name = item.title;
          const description = item.snippet;
          const link = item.link;

          return (
            <div key={i} className="col-md-6 col-lg-4 mb-4">
              <div className="card mx-auto" style={{ width: '20rem' }}>
                {image && (
                  <img
                    src={image}
                    className="card-img-top"
                    alt={name}
                    style={{ objectFit: 'cover', height: '180px' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title fw-bold">{name}</h5>
                  <p className="card-text text-black-50">{description}</p>
                  <p className="fw-bold text-success">Promo</p>
                  <a
                    href={link}
                    target="_blank"
                    className={Styles.button}
                    rel="noopener noreferrer"
                  >
                    View Deal
                  </a>
                </div>
              </div>
            </div>
          );
        })}

      </div>
        {/* Feedback Link - added here */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf15-awwLAA83qNTyJkRDbTngRVOVgdt4IK1gRFRKusWT_Z2w/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 15px',
              backgroundColor: '#0070f3',
              color: 'white',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            💬 Give Us Your Feedback
          </a>
          </div>
    </div>
      </>
  );
}
