'use client';
import Styles from "./css/products.module.css";
import SecondStyles from "./css/nav.module.css";
import { useEffect, useState } from "react";

type Product = {
  link?: string;
  title?: string;
  snippet?: string;
  pagemap?: { cse_image?: { src: string }[] };
  productUrl?: string;
  productTitle?: string;
  imageUrl?: string;
  description?: string;
  productId?: string | number;
};

type ProductsProps = {
  initialResults: Product[];
  loading: boolean;
};

export default function Products({ initialResults, loading }: ProductsProps) {
  const [selectedSite, setSelectedSite] = useState("All Sites");
  const [amazonResults] = useState(initialResults || []);
  const [aliResults, setAliResults] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>(initialResults || []);
  const [loadingState, setLoadingState] = useState(loading);

  useEffect(() => {
    const fetchAliProducts = async () => {
      if (selectedSite === "Ali Express") {
        setLoadingState(true);
        try {
          const res = await fetch("/api/ali-products");
          const data = await res.json();
          setAliResults(data.result || []);
          setResults(data.result || []);
        } catch {
          setAliResults([]);
          setResults([]);
        } finally {
          setLoadingState(false);
        }
      } else if (selectedSite === "Amazon") {
        setResults(amazonResults);
      } else {
        // All Sites = combine Amazon + AliExpress
        setResults([...amazonResults, ...aliResults]);
      }
    };

    fetchAliProducts();
  }, [selectedSite, amazonResults, aliResults]);

  if (loadingState) return <p className="text-center mt-4">Loading...</p>;
  if (!results?.length) return <p className="text-center mt-4">No results found.</p>;

  const filteredResults = results.filter((item) => {
    if (selectedSite === "All Sites") return true;
    const link = item.link || item.productUrl || "";
    return link.toLowerCase().includes(selectedSite.toLowerCase().replace(" ", ""));
  });

  return (
    <>
      <h1 className={`mt-5 mb-5 ${Styles.title} ${SecondStyles.logo}`}>Products</h1>

      <div className="container mt-5">
        {/* Filter */}
        <div className="row mb-4">
          <div className="col-12">
            <div className={`dropdown mb-5 ${Styles.dropdown}`}>
              <p>Filter Sites</p>
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
            const image = item.pagemap?.cse_image?.[0]?.src || item.imageUrl;
            const name = item.title || item.productTitle || "No Title";
            const description = item.snippet || item.description || "";
            const link = item.link || item.productUrl || "#";

            return (
              <div key={item.productId || i} className="col-md-6 col-lg-4 mb-4">
                <div className="card mx-auto" style={{ width: "20rem" }}>
                  {image && (
                    <img
                      src={image}
                      className="card-img-top"
                      alt={name}
                      style={{ objectFit: "cover", height: "180px" }}
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

        {/* Feedback Link */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf15-awwLAA83qNTyJkRDbTngRVOVgdt4IK1gRFRKusWT_Z2w/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 15px",
              backgroundColor: "#0070f3",
              color: "white",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            💬 Give Us Your Feedback
          </a>
        </div>
      </div>
    </>
  );
}
