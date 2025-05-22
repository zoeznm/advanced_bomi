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
          <span className="col1">B</span>
          <span className="col2">o</span>
          <span className="col3">m</span>
          <span className="col4">i</span>
        </Link>
      </div>
      <div className="search-area">
        <SearchBar onMenuClick={() => setShowNavbar(!showNavbar)} />
      </div>
      {showNavbar && <Navbar />}
    </div>
  );
}
