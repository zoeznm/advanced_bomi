// File: src/pages/projects.tsx
import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import '../styles/MainPage.css';
import '../styles/SearchBar.css';
import '../styles/Navbar.css';
import '../styles/Page.css';

export default function Projects() {
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div className="container">
      <div className="topbar">
        <Link href="/mainpage">
          <div className="logoIcon">Front-end</div>
        </Link>
        <SearchBar
          initialQuery="projects"
          onMenuClick={() => setShowNavbar(!showNavbar)}
        />
        {showNavbar && <Navbar />}
      </div>
      <div className="content">
        <p>This is the Projects page content.</p>
      </div>
    </div>
  );
}