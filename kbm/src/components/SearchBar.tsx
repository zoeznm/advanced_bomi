// File: src/components/SearchBar.tsx
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import '../styles/SearchBar.css';

type Props = { onMenuClick: () => void; initialQuery?: string; hideMenuButton?: boolean; };
export default function SearchBar({ onMenuClick, initialQuery = '', hideMenuButton = false }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    router.push(q === 'bomi' ? '/bomi' : q === 'projects' ? '/projects' : q === 'contact' ? '/contact' : '/mainpage');
    setQuery('');
  };
  return (
    <form className="searchForm" onSubmit={handleSearch}>
      <input type="text" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
      <button type="submit">Search</button>
      {!hideMenuButton && <button type="button" onClick={onMenuClick}>☰</button>}
    </form>
  );
}
