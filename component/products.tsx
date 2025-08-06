'use client';
import Styles from "./css/products.module.css";
import SecondStyles from "./css/nav.module.css";

type ProductsProps = {
  results: any[];
  loading: boolean;
};

export default function Products({ results, loading }: ProductsProps) {
  
   
  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!results.length) return <p className="text-center mt-4">No results found.</p>;

  return (
    <>
    <h1 className={`mt-5 mb-5 ${Styles.title} ${SecondStyles.logo}`}>Products</h1>

    <div className="container mt-5">
      {/* Filter Placeholder */}
      <div className="row mb-4">
        <div className="col-12">
          {/* You can replace this with actual filter options later */}
          <p className="text-muted">🔍 Filters coming soon...</p>
        </div>
      </div>

      <div className="row">
        {results.map((item, i) => {
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
                    className="btn btn-primary"
                    rel="noopener noreferrer"
                  >
                    See Details
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
      </>
  );
}
