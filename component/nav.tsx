'use client';
import Link from "next/link";       
import Styles from "./css/nav.module.css";

export default function Navbar() {
  return (
    <nav className="navbar bg-white shadow-sm py-3 px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">

     
        <div className="d-flex align-items-center" >
            <div className={Styles.logo}>
          <Link href="/" className="navbar-brand fw-bold fs-4 text-dark mb-0">
            Promo<span>Finder</span>
          </Link>
          </div>
        </div>

        <div className="flex-grow-1 px-3 d-none d-md-block" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <form className="d-flex">
            <input
              type="search"
              className={`form-control rounded-pill px-4 ${Styles.search}`}
              placeholder="Search deals..."
              aria-label="Search"
            />
          </form>
        </div>

   
<div className="d-flex ">
   <Link
    href="/login"
    className={Styles.login}
  >
    Login
  </Link>
</div>


      </div>
    </nav>
  );
}
