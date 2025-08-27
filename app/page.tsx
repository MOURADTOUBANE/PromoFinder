'use client';
import Hero from '@/component/hero';
import Navbar from '../component/nav';
import { useEffect, useState } from 'react';
import Products from '@/component/products';
import Footer from '@/component/footer';
import Features from '@/component/features';

export default function Home() {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const[loading, setLoading] = useState(false);

  useEffect(() =>{
    const fetchDefault = async () => {
      setLoading(true);
      const res = await fetch (`/api/search?q=book`);
      const data = await res.json();
      setResults(data.items || []);
      setLoading(false);
    };
    fetchDefault();
  },[]);

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
  <Navbar/>
  <Hero />
  <Features />
 
  </>
  );
}
