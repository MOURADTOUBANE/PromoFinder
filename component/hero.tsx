import Link from "next/link" ;
import Styles from "./css/hero.module.css";
import NavStyles from "./css/nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faUsers, faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";

export default function Hero(){
    return(
        <>         
      <div className={Styles.hero}>
  <div className={Styles.overlay}>
    <h1 className={Styles.title}>
      Find the Best <br />
      <span className={NavStyles.logo}>Deals & Discounts</span>
    </h1>

    <Link href="/deals" className={NavStyles.login}>
      Explore Deals
    </Link>
  </div>

  {/* desktop */}
  <div className="row px-3 d-none d-md-flex">
    <div className="col-md-6">
      <h1 className={Styles.title}>
        Find the Best <br />
        <span className={NavStyles.logo}>Deals & Discounts</span>
      </h1>
      <p className={`text-black-50 ${Styles.extract}`}>
        Discover amazing deals from top e-commerce sites. Save up to 70% on
        electronics, fashion, home goods, and more.
      </p>
      <div className="d-flex mt-4 mb-5">
        <Link href="/deals" className={NavStyles.login}>
          Explore Deals
        </Link>
        <p className="ms-3 mt-2 text-black-50 fw-bold">
          ⭐1000+ verified deals
        </p>
      </div>
    </div>

    <div className="col-md-6 mb-5">
      <Link href="#">
        <img
          className={`${Styles.image} img-fluid`}
          src="/images/deals-hero.jpg"
          alt="Deals Hero"
        />
      </Link>
    </div>
  </div>
</div>

       
        <div className={`d-flex justify-content-around  ${Styles.infos}`}>

            <div className="Deals">
                <div className={Styles.icon}>
                <FontAwesomeIcon icon={faBagShopping}  />
                </div>
               <h1>10,000+</h1>
               <p >Active Deals</p>
            </div>

            <div className="Bonus">
                 <div className={Styles.icon}>
                <FontAwesomeIcon icon={faUsers} />
                </div>
                <h1>50k+</h1>
                <p>Happy Users</p>
            </div>

            <div className="MoneySave">
                 <div className={Styles.icon}>
                <FontAwesomeIcon icon={faMoneyBillTrendUp} />
                </div>
                <h1>$2M</h1>
                <p>Money Saved</p>
            </div>

        </div>
        </>
    );
}