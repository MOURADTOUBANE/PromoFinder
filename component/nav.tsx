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

export default function Navbar({ query, setQuery, handleSearch, loading }: Props) {
  return (
    <nav className={`navbar fixed-top shadow-sm py-3 px-4  ${Styles.navbar}`}>
      <div className={`container-fluid ${Styles.container}`}>
     
        <div className={Styles.logo}>
          <Link href="/" className="navbar-brand fw-bold fs-5  mb-0">
            PromoFinder
          </Link>
        </div>

        <form className={Styles.searchForm} onSubmit={handleSearch}>
          <input
            type="search"
            className="form-control rounded-pill px-4"
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

      
        <div className={Styles.hidden}>
          <Link href="/login" className={Styles.login}>
            Login
          </Link>
        </div>
  
      </div>
    </nav>
  );
}
