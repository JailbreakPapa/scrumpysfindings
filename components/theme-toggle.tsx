'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Win96Window, Win96Button, Win96Menu } from './ui/win96';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-8 bg-gray-400 border border-gray-500 animate-pulse" />
    );
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const menuItems = [
    {
      label: '☀️ Light Mode',
      onClick: () => setTheme('light'),
      disabled: theme === 'light',
    },
    {
      label: '🌙 Dark Mode',
      onClick: () => setTheme('dark'),
      disabled: theme === 'dark',
    },
    {
      label: '💻 System',
      onClick: () => setTheme('system'),
      disabled: theme === 'system',
    },
  ];

  return (
    <div className="relative" style={{ zIndex: 20 }}>
      <Win96Button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center justify-center w-10 h-8"
      >
        {getThemeIcon()}
      </Win96Button>
      
      {isMenuOpen && (
        <Win96Menu
          items={menuItems}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}

export function ThemeWindow() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className="absolute top-16 right-32 hidden md:block"
    >
      <Win96Window
        title="display_settings.exe"
        icon={<div className="w-4 h-4 bg-purple-500 rounded-sm" />}
        className="w-72"
      >
        <div className="p-4 space-y-4">
          <div className="text-sm font-mono">
            <div className="mb-3">Display Theme Settings</div>
            <div className="space-y-2">
              <Win96Button
                onClick={() => setTheme('light')}
                variant={theme === 'light' ? 'primary' : 'default'}
                className="w-full flex items-center gap-2 justify-start"
              >
                <Sun className="w-4 h-4" />
                Light Mode
              </Win96Button>
              
              <Win96Button
                onClick={() => setTheme('dark')}
                variant={theme === 'dark' ? 'primary' : 'default'}
                className="w-full flex items-center gap-2 justify-start"
              >
                <Moon className="w-4 h-4" />
                Dark Mode
              </Win96Button>
              
              <Win96Button
                onClick={() => setTheme('system')}
                variant={theme === 'system' ? 'primary' : 'default'}
                className="w-full flex items-center gap-2 justify-start"
              >
                <Monitor className="w-4 h-4" />
                System Default
              </Win96Button>
            </div>
          </div>
          
          <div className="border-t-2 border-gray-400 pt-3 text-xs text-gray-600">
            Current: {theme === 'system' ? 'Following system preferences' : `${theme} mode`}
          </div>
        </div>
      </Win96Window>
    </motion.div>
  );
}
