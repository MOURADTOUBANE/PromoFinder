'use client';
import Navbar from "@/component/nav";
import Styles from '../css/support.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faComment, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function Support() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const faqCards = [
    {
      question: "How often are deals updated?",
      answer: "Our platform updates deals in real-time. New deals are added throughout the day."
    },
    {
      question: "Are the deals verified?",
      answer: "Yes! We verify all deals before displaying them and remove expired offers."
    },
    {
      question: "Is there a mobile app?",
      answer: "Our website is fully responsive and works great on mobile! Apps are coming soon."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use encryption and never share your personal data without consent."
    }
  ];

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = {
      name: (form[0] as HTMLInputElement).value,
      email: (form[1] as HTMLInputElement).value,
      subject: (form[2] as HTMLInputElement).value,
      message: (form[3] as HTMLTextAreaElement).value,
    };

    const res = await fetch("http://localhost:3000/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Message sent!");
      form.reset();
    } else {
      toast.error("Failed to send. Try again.");
    }
  };

  // Detect screen size
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Auto scroll for desktop
  useEffect(() => {
    if (isMobile) return;
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame: number;
    const step = 0.5;

    const scroll = () => {
      if (!isPaused) {
        container.scrollLeft += step;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    scroll();
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, isMobile]);

  // Infinite loop effect for mobile (reset scrollLeft when reaching end)
  useEffect(() => {
    if (!isMobile) return;
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        // Reset smoothly to start
        container.scrollLeft = 0;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <>
      <div className={`text-center ${Styles.hero}`}>
        <h1 className={Styles.mainTitle}>Get In Touch</h1>
        <p className={Styles.info}>
          Have questions about DealHunter? Want to partner with us? We'd love to hear from you.
        </p>
      </div>

      <div className={`d-flex justify-content-around mt-5 ${Styles.contact}`}>
        <div className={Styles.card}>
          <div className={Styles.icon}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <h1>Email Us</h1>
          <p className={Styles.email}>dealhunters.team1@gmail.com</p>
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

      <form onSubmit={handleSubmit} className={Styles.form}>
        <h1>Send us a Message</h1>
        <label>Name *</label>
        <input type="text" placeholder="Your full name" required />
        <label>Email *</label>
        <input type="email" placeholder="your@email.com" required />
        <label>Subject *</label>
        <input type="text" placeholder="What is this about?" required />
        <label>Message *</label>
        <textarea placeholder="Tell us more about your problem..." required />
        <button type="submit">
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

        {/* ✅ auto-scroll desktop + infinite loop mobile */}
        <div
          className={Styles.cards}
          ref={scrollRef}
          onMouseEnter={() => !isMobile && setIsPaused(true)}
          onMouseLeave={() => !isMobile && setIsPaused(false)}
        >
          {[...faqCards, ...faqCards].map((item, index) => (
            <div className={Styles.answerCard} key={index}>
              <h1>{item.question}</h1>
              <p>{item.answer}</p>
            </div>
          ))}
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
      />
    </>
  );
}
