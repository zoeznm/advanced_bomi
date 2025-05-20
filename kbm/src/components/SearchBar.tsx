// File: src/components/SearchBar.tsx
import { useState, FormEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/SearchBar.css';

type Props = {
  onMenuClick: () => void;
  initialQuery?: string;
  hideMenuButton?: boolean;
};

const STATIC_SUGGESTIONS = ['bomi', 'projects', 'contact'];

export default function SearchBar({ onMenuClick, initialQuery = '', hideMenuButton = false }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(query);
  };

  const navigate = (q: string) => {
    const lower = q.trim().toLowerCase();
    if (lower === 'bomi') router.push('/bomi');
    else if (lower === 'projects') router.push('/projects');
    else if (lower === 'contact') router.push('/contact');
    else router.push('/mainpage');
    setQuery('');
    setShowSuggestions(false);
  };

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = STATIC_SUGGESTIONS.filter(item =>
    item.startsWith(query.trim().toLowerCase())
  );

  return (
    <div className="searchWrapper" ref={wrapperRef}>
      <form className="searchForm" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
        <button type="submit">Search</button>
        {!hideMenuButton && (
          <button type="button" onClick={onMenuClick}>☰</button>
        )}
      </form>
      {showSuggestions && (
        <ul className="suggestions">
          {filtered.map(item => (
            <li key={item} onClick={() => navigate(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}