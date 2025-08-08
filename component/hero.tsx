import Link from "next/link" ;
import Styles from "./css/hero.module.css";
import NavStyles from "./css/nav.module.css";

export default function Hero(){
    return(
        <>
        <div className={`row ms-3 mt-5 ${Styles.hero}`}>
            <div className="col-md-6">
                <div >
                <h1 className={Styles.title}>
                    Find the Best
                     <br></br>
               <span className={NavStyles.logo}>Deals & Discounts</span> 
                </h1>
                </div>
                <p className={`text-black-50 ${Styles.extract}`}>Discover amazing deals from top e-commerce sites.
                     Save up to 70% on electronics, fashion, home goods, 
                     and more.
                     </p>

                <div className="d-flex mt-4 mb-5 ">
                    <Link
                       href="#"
                        className={NavStyles.login}>
                       Explore Deals
                    </Link>
                    <p className="ms-3 mt-2 text-black-50 fw-bold">⭐1000+ verified deals</p>
                </div>


            </div>
        <div className="col-md-6 mb-5 ">
            <Link href="#" >
            <img 
             className={`${Styles.image} img-fluid `}
            src="/images/deals-hero.jpg"
            alt="Deals Hero"
            />
            </Link>
            </div>
        </div>

       
        <div className={`d-flex justify-content-around  ${Styles.infos}`}>

            <div className="partners">
               <h1>50+</h1>
               <p >Partner Stores</p>
            </div>

            <div className="savings">
                <h1>70%</h1>
                <p>Max Savings</p>
            </div>

            <div className="updates">
                <h1>24/7</h1>
                <p>Updated</p>
            </div>

        </div>
        </>
    );
}