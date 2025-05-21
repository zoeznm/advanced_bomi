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
    Array.from({ length: 5 }, (_, i) => {
      const top = 50 + (i % 2) * 120;
      const left = 50 + Math.floor(i / 2) * 250;
      return {
        id: i,
        visible: true,
        folded: false,
        expanded: false,
        top,
        left,
        initialTop: top,
        initialLeft: left,
      };
    })
  );
  const [dragInfo, setDragInfo] = useState<{ id: number; offsetX: number; offsetY: number } | null>(null);

  const handleDragStart = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    const box = boxes.find(b => b.id === id);
    if (!box || box.expanded) return;
    const offsetX = e.clientX - box.left;
    const offsetY = e.clientY - box.top;
    setDragInfo({ id, offsetX, offsetY });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragInfo) return;
      setBoxes(prev =>
        prev.map(b => {
          if (b.id === dragInfo.id && !b.expanded) {
            const newTop = e.clientY - dragInfo.offsetY;
            const newLeft = e.clientX - dragInfo.offsetX;
            return { ...b, top: newTop, left: newLeft, initialTop: newTop, initialLeft: newLeft };
          }
          return b;
        })
      );
    };
    const handleMouseUp = () => {
      if (dragInfo) setDragInfo(null);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragInfo, boxes]);

  const handleClose = (id: number) => {
    setBoxes(prev => prev.map(b => (b.id === id ? { ...b, visible: false } : b)));
  };

  const handleFold = (id: number) => {
    setBoxes(prev =>
      prev.map(b => (b.id === id ? { ...b, folded: !b.folded } : b))
    );
  };

  const handleExpand = (id: number) => {
    setBoxes(prev =>
      prev.map(b => {
        if (b.id === id) {
          if (!b.expanded) {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const boxWidth = 240;
            const boxHeight = b.folded ? 30 : 120;
            return {
              ...b,
              expanded: true,
              top: (vh - boxHeight) / 2,
              left: (vw - boxWidth) / 2,
            };
          } else {
            return {
              ...b,
              expanded: false,
              top: b.initialTop,
              left: b.initialLeft,
            };
          }
        }
        return { ...b, expanded: false };
      })
    );
  };

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
        {boxes.map(b =>
          b.visible && (
            <div
              key={b.id}
              className={`box${b.folded ? ' folded' : ''}${b.expanded ? ' expanded' : ''}`}
              style={{ top: b.top, left: b.left }}
              onMouseDown={e => handleDragStart(b.id, e)}
            >
              <div className="box-controls">
                <button className="btn fold" onClick={() => handleFold(b.id)}>—</button>
                <button className="btn expand" onClick={() => handleExpand(b.id)}>□</button>
                <button className="btn close" onClick={() => handleClose(b.id)}>×</button>
              </div>
              {!b.folded && <div className="box-content">Box {b.id + 1}</div>}
            </div>
          )
        )}
      </div>
    </div>
  );
}