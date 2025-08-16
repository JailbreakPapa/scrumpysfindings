"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Win96Window, Win96Button } from "@/components/ui/win96";
import { BlogPost } from "@/lib/blog";

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <div className="win96-desktop starry-night retro-crt h-screen min-h-screen overflow-y-auto">
      <div className="container mx-auto max-w-4xl px-4 py-20">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Win96Button className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Back to Blog
            </Win96Button>
          </Link>
        </motion.div>

        {/* Article Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Win96Window
            title={`${post.title.toLowerCase().replace(/\s+/g, "_")}.md`}
            icon={<div className="size-4 rounded-sm bg-green-500" />}
            className="w-full"
          >
            <article className="p-8">
              {/* Article Header */}
              <header className="mb-8 border-b-2 border-gray-400 pb-6">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="h2-bold text-gradient mb-4"
                >
                  {post.title}
                </motion.h1>

                {/* Article Meta */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4 flex flex-wrap items-center gap-6 text-sm text-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>{format(new Date(post.date), "MMMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>{post.readTime} minute read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="size-4" />
                    <span>{post.author}</span>
                  </div>
                </motion.div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6 flex flex-wrap gap-2"
                  >
                    {post.tags.map((tag) => (
                      <span key={tag} className="win96-tag">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3"
                >
                  <Win96Button className="flex items-center gap-2">
                    <Share2 className="size-4" />
                    Share
                  </Win96Button>
                  <Win96Button className="flex items-center gap-2">
                    <Bookmark className="size-4" />
                    Bookmark
                  </Win96Button>
                </motion.div>
              </header>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </Win96Window>
        </motion.div>

        {/* Related Posts or Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <Win96Window
            title="comments.exe"
            icon={<div className="size-4 rounded-sm bg-blue-500" />}
          >
            <div className="p-8 text-center">
              <div className="mb-4 text-4xl">💬</div>
              <h3 className="mb-2 text-lg font-bold">Comments Coming Soon</h3>
              <p className="text-gray-600">
                Comment system will be implemented in a future update.
              </p>
            </div>
          </Win96Window>
        </motion.div>
      </div>
    </div>
  );
}
