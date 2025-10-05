'use client';
import Link from "next/link";
import Styles from "./css/nav.module.css";
import { FormEvent, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { faHouse, faMagnifyingGlass, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { usePathname, useRouter } from "next/navigation";
import { useUser } from '@/app/context/UserContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const isActive = (path: string) => pathname == path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const { user } = useUser();
  const router = useRouter();

  
  return (
    <nav className={`navbar fixed-top shadow-sm py-3 px-4  ${Styles.navbar}`}>
      {/*logo*/}
      <div className={Styles.brand}>
        <Link href="/" className={`navbar-brand  mb-0 ms-1 ${Styles.logo}`}>
          DealHunter
        </Link>
      </div>

      {/* Mobile hamburger button */}
      <button 
        className={Styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>
        
     {/*Links*/}
<div className={`${Styles.links} ${isMenuOpen ? Styles.open : ''}`}>
  <ul>
    <li className={isActive("/") ? Styles.active : ""}>
      <FontAwesomeIcon icon={faHouse} />
      <Link href="/" className={Styles.page} onClick={closeMenu}>Home</Link>
    </li>
    <li className={isActive("/deals") ? Styles.active : ""}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <Link href="/deals" className={Styles.page} onClick={closeMenu}>Deals</Link>
    </li>
    <li className={isActive("/favorite") ? Styles.active : ""}>
  <FontAwesomeIcon icon={faHeart} />
  <Link
    href="/favorite"
    className={Styles.page}
    onClick={(e) => {
      closeMenu();
      if (!user) {
        e.preventDefault();
        router.push("/signIn"); 
      }
    }}
  >
    Favorite
  </Link>
</li>
    <li className={isActive("/support") ? Styles.active : ""}>
      <FontAwesomeIcon icon={faEnvelope} />
      <Link href="/support" className={Styles.page} onClick={closeMenu}>Support</Link>
    </li>
  </ul>
  {/* Mobile Sign In (inside dropdown menu) */}
  <div className={Styles.mobileSignIn}>
  {user ? (
    <Link href="/userProfile" 
    className={Styles.login}
    onClick={(e) => {
      closeMenu();
      if (!user) {
        e.preventDefault();
        router.push("/signIn"); 
      }
    }}
    >
      Account
    </Link>
  ) : (
    <Link href="/login" className={Styles.login}>
      Sign In
    </Link>
  )}
</div>

</div>

{/* Desktop Sign In */}
 <div className={Styles.loginContainer}>
        {user ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className={Styles.profileImage}
              onClick={() => router.push("/userProfile")}
          />
        ) : (
          <Link href="/login" className={Styles.login}>Sign In</Link>
        )}
      </div>
    </nav>
    
  );
}