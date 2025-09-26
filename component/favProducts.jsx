import Styles from "./css/favProducts.module.css";


export default function FavProduct({
  productId,
  productTitle,
  productImage,
  productDiscount,
  productPrice,
  productCurrency,
  productOriginalPrice,
  productRating,
  productOrders,
  productUrl,
 onRemove,
}) 
    
{
   
  return (
    <div key={productId} className={Styles.productCardHorizontal}>
      <div className={Styles.productImageLeft}>
        <img
          src={productImage}
          alt={productTitle}
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg';
          }}
        />
        {productDiscount && (
          <span className={Styles.discountBadge}>
            -{productDiscount}%
          </span>
        )}
      </div>

      <div className={Styles.productInfo}>
        <h3 className={Styles.productTitle}>{productTitle}</h3>

        <div className={Styles.priceSection}>
          <span className={Styles.currentPrice}>
            {productPrice} {productCurrency || 'USD'}
          </span>
          {productOriginalPrice && (
            <span className={Styles.originalPrice}>
              {productOriginalPrice} {productCurrency || 'USD'}
            </span>
          )}
        </div>

        <div className={Styles.productMeta}>
          {productRating && (
            <div className={Styles.rating}>
              ⭐ {productRating}
              <span>({productOrders || 0})</span>
            </div>
          )}
        </div>

        <a
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={Styles.buyButton}
        >
          Buy Now
        </a>
      </div>

     
        {onRemove && (
        <div className={Styles.trashContainer}>
          <button
            className={Styles.trashButton}
            onClick={() => onRemove(productId)}
            title="Remove from favorites"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}