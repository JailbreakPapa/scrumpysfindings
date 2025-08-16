'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedGradientText from '../ui/animated-gradient-text';
import AnimatedGridPattern from '../ui/animated-grid-pattern';
import { Win96Window, Win96Button } from '../ui/win96';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative px-6 pb-44 pt-32" style={{ contain: 'layout' }}>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center mb-16"
      >
        <Win96Window
          title="startup.exe - WD Studios Developer Console"
          icon={<div className="w-4 h-4 bg-green-500 rounded-sm animate-pulse" />}
          minimizable={false}
          maximizable={false}
          closable={false}
        >
          <div className="p-8 bg-black text-green-400 font-mono">
            <div className="space-y-2 text-sm">
              <div>C:\Users\Mikael&gt; whoami</div>
              <div className="text-green-300">mikael.aboagye</div>
              <div>C:\Users\Mikael&gt; cat profile.txt</div>
              <div className="text-white">Creating Amazing Software & Living Life.</div>
              <div>C:\Users\Mikael&gt; status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online - Ready for new challenges</span>
              </div>
            </div>
          </div>
        </Win96Window>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="pt-16"
      >
        <h1 className="h1-bold flex flex-col items-start md:items-center text-gradient">
          <span>Creating Amazing Software</span>
          <span>&</span>
          <span>Living Life.</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 flex flex-col-reverse gap-8 md:flex-row md:justify-center md:gap-20 lg:gap-32"
      >
        <div className="flex w-fit flex-col items-start gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Win96Window
              title="profile.exe"
              icon={<div className="w-4 h-4 bg-blue-500 rounded-sm" />}
              className="mb-4"
            >
              <div className="p-4">
                <p className="font-Silkscreen font-normal uppercase text-gray-700 text-sm">
                  Mikael K. Aboagye - C++/C# Software Engineer
                </p>
              </div>
            </Win96Window>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Link
              href="https://www.linkedin.com/in/mikael-aboagye-77215225b/"
              target="_blank"
            >
              <Win96Button className="flex items-center gap-2 px-6 py-3">
                🤝 <span className="text-gradient">Let&apos;s Start Something.</span>
              </Win96Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-2 md:flex-col"
        >
          <Win96Window
            title="skills.exe"
            icon={<div className="w-4 h-4 bg-purple-500 rounded-sm" />}
          >
            <div className="p-4 space-y-2">
              <p className="font-Silkscreen font-normal uppercase text-gray-600 text-xs">
                Building...
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="win96-tag bg-green-200">
                  <span className="text-green-800">Complex</span>
                </span>
                <span className="win96-tag bg-blue-200">
                  <span className="text-blue-800">Mind Blowing</span>
                </span>
                <span className="win96-tag bg-yellow-200">
                  <span className="text-yellow-800">Scalable</span>
                </span>
                <span className="win96-tag bg-purple-200">
                  <span className="text-purple-800">Engines & Game Tools!</span>
                </span>
              </div>
            </div>
          </Win96Window>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute top-0 -z-20 size-full overflow-hidden opacity-30 [mask-image:radial-gradient(900px_circle_at_top,#000,transparent)]">
        <AnimatedGridPattern
          numSquares={120}
          maxOpacity={0.1}
          duration={5}
          repeatDelay={1}
          colors={[
            'rgba(60, 177, 121, 1)',
            'rgba(157, 91, 210, 1)',
            'rgba(205, 43, 49, 1)',
            'rgba(189, 75, 0, 1)',
            'rgba(247, 206, 0, 1)',
            'rgba(250, 147, 78, 1)',
            'rgba(54, 158, 255, 1)',
          ]}
          className="inset-x-[4.5px] inset-y-[-30%] h-[150%]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(#000_50%,transparent)]">
        <div className="grid-pattern pointer-events-none absolute inset-0" />
      </div>
    </section>
  );
};
export default Hero;
