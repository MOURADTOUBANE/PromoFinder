'use client';
import Hero from '@/component/hero';
import Navbar from '../component/nav';
import { useState } from 'react';
import Products from '@/component/products';

export default function Home() {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const[loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!query.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.items || []);
    setLoading(false);
  };

  return (
  <>
  <Navbar
   
   query={query}
   setQuery={setQuery}
   handleSearch={handleSearch}
   loading={loading}
  />
  <Hero />
  <Products
  results={results}
  loading={loading}
  />
  </>
  );
}
