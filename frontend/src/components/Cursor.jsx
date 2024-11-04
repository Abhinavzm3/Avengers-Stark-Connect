// Cursor.jsx
import React, { useEffect, useState } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '2.5rem', // Adjust size as needed
        height: '2.5rem',
        backgroundImage: "url('/images/Cursor.png')",
        backgroundSize: 'cover',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        position: 'fixed', // Ensure cursor remains fixed on screen
        zIndex: 1000, // High z-index to keep cursor on top of all elements
      }}
    ></div>
  );
};

export default Cursor;
