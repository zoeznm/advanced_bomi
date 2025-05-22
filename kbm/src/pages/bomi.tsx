// File: src/pages/bomi.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import "../styles/SearchBar.css";
import "../styles/Navbar.css";
import "../styles/Bomi.css";


export default function Bomi() {
  const [showNavbar, setShowNavbar] = useState(false);
  const titles = ["ABOUT", "STRENGTHS", "VALUE", "VISION", "GOALS"];

  // 초기 위치를 CSS 변수로 설정할 값
  const initialPositions = [
    { top: 20, left: 30 },
    { top: 50, left: 200 },
    { top: 200, left: 50 },
    { top: 300, left: 300 },
    { top: 450, left: 150 },
  ];

  const [dragInfo, setDragInfo] = useState<{ id: number; offsetX: number; offsetY: number } | null>(null);

  // Drag start: record offset within element
  const handleDragStart = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    setDragInfo({ id, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top });
  };

  // Drag move & up: update CSS variables for top/left
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragInfo) return;
      const { id, offsetX, offsetY } = dragInfo;
      const top = e.clientY - offsetY;
      const left = e.clientX - offsetX;
      const el = document.querySelector(`.box${id + 1}`) as HTMLElement;
      if (el && !el.classList.contains("expanded")) {
        el.style.setProperty("--top", `${top}px`);
        el.style.setProperty("--left", `${left}px`);
      }
    };
    const onMouseUp = () => setDragInfo(null);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragInfo]);

  // 박스 배열 생성: id, title, 상태, 초기 위치 포함
  const boxes = titles.map((title, i) => ({
    id: i,
    title,
    visible: true,
    folded: false,
    expanded: false,
    initialTop: initialPositions[i].top,
    initialLeft: initialPositions[i].left,
  }));

  // 접기/펼치기 제어
  const handleFold = (id: number) => {
    const el = document.querySelector(`.box${id + 1}`) as HTMLElement;
    el.classList.toggle("folded");
  };
  const handleExpand = (id: number) => {
    boxes.forEach((_, idx) => {
      const el = document.querySelector(`.box${idx + 1}`) as HTMLElement;
      if (idx === id) {
        el.classList.toggle("expanded");
      } else {
        el.classList.remove("expanded");
      }
    });
  };

  return (
    <div className="bomi-container">
      <div className="topbar">
        <Link href="/mainpage">
          <div className="logoIcon">Front-end</div>
        </Link>
        <SearchBar initialQuery="bomi" onMenuClick={() => setShowNavbar(!showNavbar)} hideMenuButton />
        {showNavbar && <Navbar />}
      </div>
      <div className="boxes-container">
        {boxes.map((b) => (
          <div
            key={b.id}
            className={`box box${b.id + 1}`}
            
            onMouseDown={(e) => handleDragStart(b.id, e)}
          >
            <div className="frame-header">
              <h1 className={`preview preview-${b.id + 1}`}>{b.title}</h1>
              <div className="three_ball">
                <button className="fold" onClick={() => handleFold(b.id)}>—</button>
                <button className="open" onClick={() => handleExpand(b.id)}>□</button>
                <button className="delete">×</button>
              </div>
            </div>
            <div className="frame-body">{b.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}