// File: src/pages/mainpage.tsx
import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import '../styles/MainPage.css';
import '../styles/SearchBar.css';
import '../styles/Navbar.css';

export default function MainPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div className="container">
      <div className="logo">
        <Link href="/mainpage">
          <span className="col1">F</span>
          <span className="col2">r</span>
          <span className="col3">o</span>
          <span className="col4">n</span>
          <span className="col5">t</span>
          <span className="col6">-</span>
          <span className="col7">e</span>
          <span className="col8">n</span>
          <span className="col9">d</span>
        </Link>
      </div>
      <div className="search-area">
        <SearchBar onMenuClick={() => setShowNavbar(!showNavbar)} />
      </div>
      {showNavbar && <Navbar />}
    </div>
  );
}
