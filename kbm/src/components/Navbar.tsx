import Link from 'next/link';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link href="/bomi">About Bomi</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
