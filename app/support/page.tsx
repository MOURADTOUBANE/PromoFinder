'use client';
import Navbar from "@/component/nav";
import Styles from '../css/support.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope} from '@fortawesome/free-regular-svg-icons';
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons/faHeadset";
import { useEffect, useRef, useState } from "react";


export default function Support (){
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [enableScroll, setEnableScroll] = useState(true);

 
  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth <= 1024) {
        setEnableScroll(false);
      } else {
        setEnableScroll(true);
      }
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // auto-scroll
  useEffect(() => {
    if (!enableScroll) return;

    const container = scrollRef.current;
    if (!container) return;

    let animationFrame: number;
    const step = 1;
    let scrollAmount = 0;

    const scroll = () => {
      if (!isPaused) {
        scrollAmount = container.scrollLeft + step;
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 0;
        }
        container.scrollLeft = scrollAmount;
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, enableScroll]);
    return(
        <>

        <div className= {`text-center ${Styles.hero}`}>
            <h1 className={Styles.mainTitle}>Get In Touch</h1>
            <p className={Styles.info}>Have questions about DealHunter? Want to partner with us? We'd love to hear from you.</p>
        </div>

        <div className={`d-flex justify-content-around mt-5 ${Styles.contact}`}>
            <div className={Styles.card}>
                <div className={Styles.icon}>
            <FontAwesomeIcon icon={faEnvelope} />
            </div>
                <h1>Email Us</h1>
                <p>support@dealhunter.com</p>
                <p>Send us an email anytime</p>
            </div>

            <div className={Styles.card}>
                <div className={Styles.icon}>
                <FontAwesomeIcon icon={faComment} />
                </div>
                <h1>Live Chat</h1>
                <p>Available 24/7</p>
                <p>Chat with our support team</p>
            </div>

            <div className={Styles.card}>
                <div className={Styles.icon}>
                <FontAwesomeIcon icon={faHeadset} />
                </div>
                <h1>Call Us</h1>
                <p>+1 (555) 123-4567</p>
                <p>Mon-Fri, 9am-6pm EST</p>
            </div>
        </div>

        <form action="#" className={Styles.form}>
  <h1>Send us a Message</h1>

  <label>Name *</label>
  <input type="text" placeholder="Your full name" className={Styles.name} />

  <label>Email *</label>
  <input type="email" placeholder="your@email.com" />

  <label>Subject *</label>
  <input type="text" placeholder="What is this about?" />

  <label>Message *</label>
  <textarea placeholder="Tell us more about your inquiry..." />

  <button>
    <span>✈</span> Send Message
  </button>
</form>


 <div className={Styles.questionsSection}>
      <div className={Styles.title}>
        <h1 className="text-center">Frequently Asked Questions</h1>
        <p className="text-center text-black-50">
          Quick answers to common questions about DealHunter.
        </p>
      </div>

      <div
        className={Styles.cards}
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={Styles.answerCard}>
          <h1>How often are deals updated?</h1>
          <p>
            Our platform updates deals in real-time. New deals are added
            throughout the day.
          </p>
        </div>

        <div className={Styles.answerCard}>
          <h1>Are the deals verified?</h1>
          <p>
            Yes! We verify all deals before displaying them and remove expired
            offers.
          </p>
        </div>

        <div className={Styles.answerCard}>
          <h1>Is there a mobile app?</h1>
          <p>
            Our website is fully responsive and works great on mobile! Apps are
            coming soon.
          </p>
        </div>

        <div className={Styles.answerCard}>
          <h1>Is my personal information secure?</h1>
          <p>
            Absolutely. We use encryption and never share your personal data
            without consent.
          </p>
        </div>
      </div>
    </div>
        </>
    );
}