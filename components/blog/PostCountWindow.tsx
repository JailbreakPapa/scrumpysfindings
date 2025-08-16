"use client";

import { motion } from "framer-motion";
import { Win96Window } from "@/components/ui/win96";

export function PostCountWindow({ count }: { count: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-12 text-center"
    >
      <Win96Window
        title="post_count.exe"
        icon={<div className="size-4 rounded-sm bg-purple-500" />}
        minimizable={false}
        maximizable={false}
        closable={false}
        className="inline-block"
      >
        <div className="p-4">
          <p className="win96-text text-lg">
            <span className="font-bold text-green-600">{count}</span> posts
            found in database
          </p>
        </div>
      </Win96Window>
    </motion.div>
  );
}
