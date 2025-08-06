'use client';
import Link from "next/link";       
import Styles from "./css/nav.module.css";
import { FormEvent } from "react";

type Props = {
  query: string;
  setQuery: (q: string) => void;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

export default function Navbar({query, setQuery, handleSearch, loading}:Props) {
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
       <form className="d-flex" onSubmit={handleSearch}>
  <input
    type="search"
    className="form-control rounded-pill px-4 "
    placeholder="Search deals..."
    aria-label="Search"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
  <button
    className={Styles.submit}
    type="submit"
    disabled={loading}
  >
    {loading ? "Searching..." : "Search"}
  </button>
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
