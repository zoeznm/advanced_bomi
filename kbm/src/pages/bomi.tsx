// File: src/pages/bomi.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import '../styles/SearchBar.css';
import '../styles/Navbar.css';
import '../styles/Bomi.css';

interface BoxState {
  id: number;
  visible: boolean;
  folded: boolean;
  expanded: boolean;
  top: number;
  left: number;
  initialTop: number;
  initialLeft: number;
}

export default function Bomi() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [boxes, setBoxes] = useState<BoxState[]>(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      visible: true,
      folded: false,
      expanded: false,
      top: 50 + (i % 2) * 180,
      left: 50 + Math.floor(i / 2) * 300,
      initialTop: 50 + (i % 2) * 180,
      initialLeft: 50 + Math.floor(i / 2) * 300,
    }))
  );
  const [dragInfo, setDragInfo] = useState<{ id: number; offsetX: number; offsetY: number } | null>(null);

  // Drag start
  const handleDragStart = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    const box = boxes.find(b => b.id === id);
    if (!box || box.expanded) return;
    setDragInfo({ id, offsetX: e.clientX - box.left, offsetY: e.clientY - box.top });
  };

  // Drag move & up
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragInfo) return;
      setBoxes(prev => prev.map(b =>
        b.id === dragInfo.id && !b.expanded
          ? { ...b, top: e.clientY - dragInfo.offsetY, left: e.clientX - dragInfo.offsetX, initialTop: e.clientY - dragInfo.offsetY, initialLeft: e.clientX - dragInfo.offsetX }
          : b
      ));
    };
    const onMouseUp = () => setDragInfo(null);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragInfo]);

  // Box controls
  const handleFold = (id: number) => setBoxes(prev => prev.map(b => b.id === id ? { ...b, folded: !b.folded } : b));
  const handleExpand = (id: number) => setBoxes(prev => prev.map(b => {
    if (b.id === id) {
      if (!b.expanded) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const boxW = 300;
        const boxH = b.folded ? 30 : 180;
        return { ...b, expanded: true, top: (vh - boxH) / 2, left: (vw - boxW) / 2 };
      } else {
        return { ...b, expanded: false, top: b.initialTop, left: b.initialLeft };
      }
    }
    return { ...b, expanded: false };
  }));

  const anyExpanded = boxes.some(b => b.expanded);

  return (
    <div className="bomi-container">
      <div className="topbar">
        <Link href="/mainpage"><div className="logoIcon">Front-end</div></Link>
        <SearchBar initialQuery="bomi" onMenuClick={() => setShowNavbar(!showNavbar)} hideMenuButton />
        {showNavbar && <Navbar />}
      </div>
      {anyExpanded && <div className="overlay" />}
      <div className="boxes-container">
        {boxes.map(b => b.visible && (
          <div
            key={b.id}
            className={`box${b.folded ? ' folded' : ''}${b.expanded ? ' expanded' : ''}`}
            style={{ top: b.top, left: b.left }}
            onMouseDown={e => handleDragStart(b.id, e)}
          >
            {/* 헤더 컴포넌트 */}
            <div className="frame-header">
              <h1>dd</h1>
              <div className="three_ball">
                <button className="fold" onClick={() => handleFold(b.id)}>—</button>
                <button className="open" onClick={() => handleExpand(b.id)}>□</button>
                <button className="delete">×</button>
              </div>
            </div>
            {/* 본문 영역 */}
            {!b.folded && (
              <div className="frame-body">
                Box {b.id + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}