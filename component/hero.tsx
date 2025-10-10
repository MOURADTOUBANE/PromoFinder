"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Styles from "./css/hero.module.css";
import NavStyles from "./css/nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faUsers, faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";

interface AnimatedCounterProps {
  end: number | string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ end, duration = 4000, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const counterRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const startTime = Date.now();
          const endValue = typeof end === "string" ? parseFloat(end.replace(/,/g, "")) : end;
          
          const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * endValue);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };
          
          animate();
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <h1 ref={counterRef}>
      {prefix}{formatNumber(count)}{suffix}
    </h1>
  );
}

export default function Hero() {
  return (
    <>
      <div className={Styles.hero}>
        <div className={Styles.overlay}>
          <h1 className={Styles.title}>
            Find the Best <br />
            <span className={NavStyles.logo}>Deals & Discounts</span>
          </h1>
          <p className={`text-white-50 ${Styles.extract}`}>
              Discover amazing deals from top e-commerce sites. Save up to 70% on
              electronics, fashion, home goods, and more.
            </p>

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

      <div className={`d-flex justify-content-around ${Styles.infos}`}>
        <div className="Deals">
          <div className={Styles.icon}>
            <FontAwesomeIcon icon={faBagShopping} />
          </div>
          <AnimatedCounter end={10000} suffix="+" />
          <p>Active Deals</p>
        </div>

        <div className="Bonus">
          <div className={Styles.icon}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <AnimatedCounter end={50000} suffix="+" />
          <p>Happy Users</p>
        </div>

        <div className="MoneySave">
          <div className={Styles.icon}>
            <FontAwesomeIcon icon={faMoneyBillTrendUp} />
          </div>
          <AnimatedCounter end={200000} suffix="+" />
          <p>Money Saved</p>
        </div>
      </div>
    </>
  );
}