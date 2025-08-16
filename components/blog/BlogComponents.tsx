'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, Tag, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost } from '@/lib/blog';
import { Win96Window, Win96Button } from '@/components/ui/win96';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Win96Window
        title={`blog_post_${post.id}.exe`}
        icon={<div className="w-4 h-4 bg-blue-500 rounded-sm" />}
        className="w-full h-full hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="font-bold text-xl win96-text group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(post.date), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{post.author}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="win96-tag"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4">
            <Link href={`/blog/${post.id}`}>
              <Win96Button className="w-full flex items-center justify-center gap-2">
                <span>Open Post</span>
                <ExternalLink className="w-4 h-4" />
              </Win96Button>
            </Link>
          </div>
        </div>
      </Win96Window>
    </motion.div>
  );
};

interface BlogListProps {
  posts: BlogPost[];
}

export const BlogList = ({ posts }: BlogListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};

export const BlogHero = () => {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 blog-grid-pattern opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center space-y-6"
      >
        <div className="inline-block">
          <Win96Window
            title="blog.exe - Scrumpy's Digital Findings"
            icon={<div className="w-4 h-4 bg-green-500 rounded-sm animate-pulse" />}
            minimizable={false}
            maximizable={false}
            closable={false}
            className="mx-auto"
          >
            <div className="p-8 text-center space-y-4">
              <h1 className="h1-bold win96-text text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Digital Findings
              </h1>
              <p className="text-xl text-gray-300 dark:text-gray-200 max-w-2xl mx-auto">
                Exploring the intersection of game development, graphics programming, 
                and cutting-edge technology through detailed technical articles.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 dark:text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-mono">System Online</span>
              </div>
            </div>
          </Win96Window>
        </div>
      </motion.div>
    </div>
  );
};
