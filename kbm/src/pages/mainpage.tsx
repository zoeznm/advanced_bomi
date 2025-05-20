import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
// import '../styles/MainPage.css';

export default function MainPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">
          <span className="col1">F</span>
          <span className="col2">r</span>
          <span className="col3">o</span>
          <span className="col4">n</span>
          <span className="col5">t</span>
          <span className="col6">-</span>
          <span className="col7">e</span>
          <span className="col8">n</span>
          <span className="col9">d</span>
        </h1>
      </header>
      <SearchBar onMenuClick={() => setShowNavbar(!showNavbar)} />
      {showNavbar && <Navbar />}
    </div>
  );
}
