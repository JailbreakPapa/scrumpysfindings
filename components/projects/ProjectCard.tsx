'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Win96Window } from '../ui/win96';

const ProjectCard = ({ src, title }: { src: string; title: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="z-10"
    >
      <Win96Window
        title={`${title.toLowerCase().replace(/\s+/g, '_')}.exe`}
        icon={<div className="w-4 h-4 bg-blue-500 rounded-sm pixelated" />}
        className="w-[350px] hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="h-[400px] w-full overflow-hidden bg-gray-300 dark:bg-gray-700">
          <Image
            src={src}
            alt={title}
            width={350}
            height={400}
            className="size-full bg-cover bg-center pixelated hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Win96Window>
    </motion.div>
  );
};
export default ProjectCard;
