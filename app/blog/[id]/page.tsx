import { notFound } from 'next/navigation';
import { getPostData, getAllPostIds } from '@/lib/blog';
import BlogPostPage from '@/components/blog/BlogPostPage';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPostIds();
  return posts.map((post) => ({
    id: post.params.id,
  }));
}

export default async function Post({ params }: PostPageProps) {
  const { id } = await params;
  
  try {
    const post = await getPostData(id);
    return <BlogPostPage post={post} />;
  } catch (error) {
    notFound();
  }
}
