"use client";

import { motion } from "framer-motion";
import { Win96Window, Win96TaskBar, Win96Button } from "../ui/win96";
import { Folder, FileText, Monitor, Settings, Code } from "lucide-react";
import { ClientOnlyTime } from "./ClientOnlyTime";
import { ThemeToggle, ThemeWindow } from "../theme-toggle";
import Link from "next/link";
import React from "react";

const DesktopIcon = ({
  icon,
  label,
  href,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  delay?: number;
}) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300 }}
      className="win96-folder group"
    >
      <div className="flex flex-col items-center gap-2 p-3 rounded hover:bg-blue-600 hover:bg-opacity-30 cursor-pointer transition-colors">
        <div className="text-white text-2xl drop-shadow-lg">{icon}</div>
        <span className="text-white text-xs font-mono text-center drop-shadow-lg group-hover:text-blue-100">
          {label}
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="outline-none focus:ring-2 focus:ring-blue-500"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export const Win96Desktop = () => {
  return (
    <div className="fixed inset-0 z-40 win96-desktop overflow-hidden pointer-events-none">
      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 space-y-4 pointer-events-auto">
        <DesktopIcon
          icon={<Folder />}
          label="Projects"
          href="/#projects"
          delay={0.1}
        />
        <DesktopIcon
          icon={<FileText />}
          label="Blog"
          href="/blog"
          delay={0.2}
        />
        {/* External link should be a direct anchor to avoid Link->a nesting */}
        <a
          href="https://github.com/WatchDogStudios"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <DesktopIcon icon={<Code />} label="GitHub" delay={0.3} />
        </a>
        <DesktopIcon
          icon={<Monitor />}
          label="Portfolio"
          href="/"
          delay={0.4}
        />
        <DesktopIcon
          icon={<Settings />}
          label="Contact"
          href="/#contact"
          delay={0.5}
        />
      </div>

      {/* Floating Windows for Visual Interest */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-32 right-16 hidden lg:block pointer-events-auto"
      >
        <Win96Window
          title="system_info.exe"
          icon={<div className="w-4 h-4 bg-green-500 rounded-sm" />}
          startMinimized={false}
          className="w-80"
        >
          <div className="p-4 font-mono text-sm space-y-1">
            <div className="flex justify-between">
              <span>CPU:</span>
              <span className="text-green-600">Game Engine Developer</span>
            </div>
            <div className="flex justify-between">
              <span>RAM:</span>
              <span className="text-blue-600">10+ Years Experience</span>
            </div>
            <div className="flex justify-between">
              <span>GPU:</span>
              <span className="text-purple-600">Creative Problem Solver</span>
            </div>
            <div className="flex justify-between">
              <span>OS:</span>
              <span className="text-orange-600">Windows 96 Professional</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-green-600 animate-pulse">● Online</span>
            </div>
          </div>
        </Win96Window>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-32 left-16 hidden xl:block pointer-events-auto"
      >
        <Win96Window
          title="quick_stats.exe"
          icon={
            <div className="w-4 h-4 bg-yellow-500 rounded-sm animate-pulse" />
          }
          className="w-64"
        >
          <div className="p-4 space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">6+</div>
              <div className="text-xs text-gray-600">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">∞</div>
              <div className="text-xs text-gray-600">Lines of Code</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-xs text-gray-600">Passion Level</div>
            </div>
            <div className="pt-2 border-t-2 border-gray-400">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/#projects"
                  className="win96-button w-full inline-flex items-center justify-center"
                >
                  Projects
                </Link>
                <Link
                  href="/blog"
                  className="win96-button w-full inline-flex items-center justify-center"
                >
                  Blog
                </Link>
                <a
                  href="https://github.com/WatchDogStudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="win96-button w-full inline-flex items-center justify-center"
                >
                  GitHub
                </a>
                <Link
                  href="/"
                  className="win96-button w-full inline-flex items-center justify-center"
                >
                  Portfolio
                </Link>
                <Link
                  href="/#contact"
                  className="win96-button w-full inline-flex items-center justify-center col-span-2"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Win96Window>
      </motion.div>

      {/* Theme Settings Window */}
      <div className="pointer-events-auto">
        <ThemeWindow />
      </div>

      {/* Taskbar */}
      <div className="pointer-events-auto">
        <Win96TaskBar>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="flex items-center gap-4 w-full"
          >
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-400 border border-gray-500 rounded-sm">
              <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
              <span className="text-sm font-mono">Start</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-8 h-6 bg-gray-400 border border-gray-500 text-xs flex items-center justify-center">
                📁
              </div>
              <div className="w-8 h-6 bg-gray-400 border border-gray-500 text-xs flex items-center justify-center">
                📝
              </div>
              <div className="w-8 h-6 bg-gray-400 border border-gray-500 text-xs flex items-center justify-center">
                💻
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2 text-sm font-mono">
              <ThemeToggle />
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Developer Mode</span>
              </div>
              <div className="px-2 py-1 bg-gray-400 border border-gray-500">
                <ClientOnlyTime />
              </div>
            </div>
          </motion.div>
        </Win96TaskBar>
      </div>
    </div>
  );
};
