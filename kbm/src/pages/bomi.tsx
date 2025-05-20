// File: src/pages/bomi.tsx
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import '../styles/MainPage.css';
import '../styles/SearchBar.css';
import '../styles/Navbar.css';
import '../styles/Page.css';

export default function Bomi() {
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div className="container">
      <div className="topbar">
        <SearchBar
          initialQuery="bomi"
          onMenuClick={() => setShowNavbar(!showNavbar)}
        />
        {showNavbar && <Navbar />}
      </div>
      <div className="content">
        <p>This is the About Bomi page content.</p>
      </div>
    </div>
  );
}