import React from 'react';
import Logo from './Logo';

interface HeaderProps {
  onLogoPositionChange?: (position: { x: number; y: number }) => void;
}

const Header = ({ onLogoPositionChange }: HeaderProps) => {
  return (
    <div className="top-0 left-0 right-0 z-50 pt-8 px-4 bg-transparent border-b-0">
      <header className="w-full max-w-7xl mx-auto py-3 px-6 md:px-8 flex items-center justify-center">
        <div className="p-3">
          <Logo onPositionChange={onLogoPositionChange} />
        </div>
      </header>
    </div>
  );
};

export default Header;