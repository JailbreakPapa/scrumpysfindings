'use client';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import NavIcons from './NavIcons';
import NavLinks from './NavLinks';
import { ThemeToggle } from '../theme-toggle';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleYScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleYScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleYScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-center transition-all duration-1000 ease-out">
      <div className="pointer-events-auto relative w-full max-w-[1200px] md:rounded-none">
        <div
          className={`mt-0 w-full overflow-hidden py-2 transition-all duration-300 ease-out ${
            isScrolled && 'md:mt-[6px]'
          }`}
          style={{
            contain: 'paint',
          }}
        >
          {/* Win96 styled navbar background */}
          <div
            className="absolute inset-0 transition-all duration-100 ease-out"
            style={{
              background: 'var(--win96-bg)',
              borderTop: '2px solid var(--win96-border-light)',
              borderLeft: '2px solid var(--win96-border-light)',
              borderRight: '2px solid var(--win96-border-dark)',
              borderBottom: '2px solid var(--win96-border-dark)',
              boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              ...(isScrolled && {
                backdropFilter: `blur(10px)`,
                WebkitBackdropFilter: `blur(10px)`,
              }),
            }}
          />

          <div className="mx-auto w-full px-6 relative z-10">
            <NavbarContent />
          </div>
        </div>
      </div>
    </div>
  );
};

const NavbarContent = () => (
  <header className="relative z-50 flex items-center justify-between">
    <NavIcons />
    <Logo />

    <div className="hidden md:flex items-center gap-4">
      <NavLinks />
      <ThemeToggle />
    </div>

    <Sheet>
      <SheetTrigger className="md:hidden win96-button flex items-center justify-center p-2" asChild>
        <div>
          <Menu className="w-4 h-4" />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="border-none win96-window">
        <SheetClose />
        <div className="mt-8">
          <NavLinks />
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </header>
);

export default NavBar;
