import React from 'react';
import Logo from './Logo';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-8 px-4 bg-background/95 backdrop-blur-md border-b border-border">
      <header className="w-full max-w-7xl mx-auto py-3 px-6 md:px-8 flex items-center justify-center">
        <div className="p-3">
          <Logo />
        </div>
      </header>
    </div>
  );
};

export default Header;