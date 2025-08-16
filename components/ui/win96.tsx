'use client';

import { motion, useDragControls } from 'framer-motion';
import { Minimize2, Maximize2, X } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';

// Simple module-level z-index manager so active windows come to front
let __win96ZIndexCounter = 100;

interface Win96WindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  minimizable?: boolean;
  maximizable?: boolean;
  closable?: boolean;
  startMinimized?: boolean;
  draggable?: boolean;
  onClose?: () => void;
}

export const Win96Window = ({
  title,
  children,
  className = '',
  icon,
  minimizable = true,
  maximizable = true,
  closable = true,
  startMinimized = false,
  draggable = true,
  onClose,
}: Win96WindowProps) => {
  const [isMinimized, setIsMinimized] = useState(startMinimized);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [zIndex, setZIndex] = useState(++__win96ZIndexCounter);
  const dragControls = useDragControls();

  if (isClosed) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: isMinimized ? 0.1 : isMaximized ? 1.02 : 1,
        opacity: isMinimized ? 0.3 : 1,
        height: isMinimized ? '40px' : 'auto',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.25 }}
      className={`win96-window ${className}`}
      style={{ zIndex, pointerEvents: 'auto', position: 'relative' }}
      onMouseDown={() => setZIndex(++__win96ZIndexCounter)}
      // Drag behavior
      drag={draggable && !isMinimized && !isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.12}
      whileDrag={{ scale: 1.01 }}
    >
      {/* Window Chrome */}
      <div
        className="win96-titlebar cursor-move select-none"
        onDoubleClick={() => maximizable && setIsMaximized(!isMaximized)}
        onPointerDown={(e) => {
          if (draggable && !isMinimized && !isMaximized) {
            dragControls.start(e);
          }
        }}
      >
        <div className="flex items-center gap-2">
          {icon && <div className="w-4 h-4">{icon}</div>}
          <span className="font-bold text-sm truncate">{title}</span>
        </div>

        <div className="flex items-center gap-1">
          {minimizable && (
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="win96-button win96-button-small"
              aria-label="Minimize"
            >
              <Minimize2 className="w-3 h-3" />
            </button>
          )}
          {maximizable && (
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="win96-button win96-button-small"
              aria-label="Maximize"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          )}
          {closable && (
            <button
              onClick={() => {
                setIsClosed(true);
                onClose?.();
              }}
              className="win96-button win96-button-small win96-button-close"
              aria-label="Close"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Window Content */}
      {!isMinimized && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="win96-content">
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

interface Win96ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

export const Win96Button = ({
  children,
  onClick,
  variant = 'default',
  disabled = false,
  className = '',
  as = 'button',
  href,
  target,
  rel,
}: Win96ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    if (!disabled) setIsPressed(true);
  };
  const handleMouseUp = () => setIsPressed(false);
  const handleClick = () => {
    if (!disabled && onClick) onClick();
  };

  const commonClass = `win96-button ${variant === 'primary' ? 'win96-button-primary' : ''} ${
    variant === 'danger' ? 'win96-button-danger' : ''
  } ${disabled ? 'win96-button-disabled' : ''} ${isPressed ? 'win96-button-pressed' : ''} ${className}`;

  if (as === 'a') {
    return (
      <motion.a
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        aria-disabled={disabled}
        className={commonClass}
        style={{ pointerEvents: disabled ? 'none' : 'auto', position: 'relative', display: 'inline-flex' }}
        href={href}
        target={target}
        rel={rel}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      disabled={disabled}
      className={commonClass}
      style={{ pointerEvents: 'auto', position: 'relative' }}
    >
      {children}
    </motion.button>
  );
};

interface Win96MenuProps {
  items: Array<{
    label: string;
    onClick?: () => void;
    separator?: boolean;
    disabled?: boolean;
  }>;
  isOpen: boolean;
  onClose: () => void;
}

export const Win96Menu = ({ items, isOpen, onClose }: Win96MenuProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.win96-menu') && !target.closest('.win96-button')) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="win96-menu"
      style={{ zIndex: 100 }}
    >
      {items.map((item, index) => (
        <div key={index}>
          {item.separator ? (
            <div className="win96-menu-separator" />
          ) : (
            <button
              onClick={() => {
                if (!item.disabled && item.onClick) item.onClick();
                onClose();
              }}
              disabled={item.disabled}
              className={`win96-menu-item ${item.disabled ? 'win96-menu-item-disabled' : ''}`}
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export const Win96TaskBar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="win96-taskbar">
      <div className="win96-taskbar-content">{children}</div>
    </div>
  );
};
