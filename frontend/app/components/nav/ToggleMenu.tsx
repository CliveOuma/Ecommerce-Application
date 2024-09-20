'use client';

import React, { useState } from 'react';
import Categories from './Categories';
import { FaBars } from 'react-icons/fa';

const ToggleMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="md:hidden"> {/* Only show on small devices */}
      <button
        className="flex items-center"
        onClick={handleMenuToggle}
      >
        <FaBars size={24} />
      </button>
      {isMenuOpen && (
        <div className="absolute left-0 w-full bg-white mt-2 shadow-md z-20">
          <div className="flex flex-col items-start">
            <Categories />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggleMenu;
