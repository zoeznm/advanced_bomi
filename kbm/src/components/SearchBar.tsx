import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import '../styles/SearchBar.css';

type Props = { onMenuClick: () => void };

export default function SearchBar({ onMenuClick }: Props) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (q === 'bomi') router.push('/bomi');
    else if (q === 'projects') router.push('/projects');
    else if (q === 'contact') router.push('/contact');
    setQuery('');
  };

  return (
    <form className="searchForm" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
      <button type="button" onClick={onMenuClick}>☰</button>
    </form>
  );
}