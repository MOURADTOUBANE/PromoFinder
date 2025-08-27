import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{faBoltLightning, faBrain, faMoneyBillWave}from"@fortawesome/free-solid-svg-icons";
import Styles from "./css/features.module.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";

export default function Features(){
    return(
        <>
        <div className={Styles.main}>
            <div className={Styles.info}>
        <h1>Why Choose DealHunter?</h1>
        <p className="text-black-50  mt-3 ">
            Discover the best deals from top e-commerce platforms with our advanced deal aggregation technology.
        </p>
        </div>


         <div className=  {`d-flex justify-content-around mt-5 ${Styles.cards}`}>    
            <div className={Styles.card}>
                <div className={Styles.icon}>
            <FontAwesomeIcon icon={faBoltLightning} />
            </div>
            <h5>Real-time Deal Updates</h5>
            <p >
                Get the latest deals from your favorite stores as they go live.
            </p>
            </div>

            <div className={Styles.card}>
                 <div className={Styles.icon}>
                <FontAwesomeIcon icon={faBrain} />
                </div>
                <h5>Smart Filtering</h5>
                <p>
                    Find exactly what you need with our advanced filtering system.
                </p>
            </div>

            <div className={Styles.card}>
                 <div className={Styles.icon}>
                <FontAwesomeIcon icon={faMoneyBillWave} />
                </div>
                <h5>Price Tracking</h5>
                <p>
                  Track price changes and get notified when deals match your budget.  
                </p>
            </div>
        </div>
    </div>

    <div className={Styles.footer}>
        <h1>Ready to Start Saving?</h1>
        <p className="mt-2">Join thousands of savvy shoppers who trust DealHunter to find the best deals online.</p>
        <button>Browse All Deals<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "8px" }} />  </button>
    </div>

        </>
    );
}