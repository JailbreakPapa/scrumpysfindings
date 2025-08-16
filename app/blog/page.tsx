import { getSortedPostsData } from "@/lib/blog";
import { BlogHero, BlogList } from "@/components/blog/BlogComponents";
import { PostCountWindow } from "@/components/blog/PostCountWindow";

export default async function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="win96-desktop starry-night retro-crt h-screen min-h-screen overflow-y-auto">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <BlogHero />

        {/* Blog Posts Section */}
        <section className="py-16">
          <PostCountWindow count={allPostsData.length} />

          {allPostsData.length > 0 ? (
            <BlogList posts={allPostsData} />
          ) : (
            // Keep this in server land, no motion needed
            <div className="py-20 text-center">
              <div className="inline-block">
                {/* Use the Win96Window inside a client component if you want animation here too */}
                <div className="p-8 text-center">
                  <div className="mb-4 text-6xl">💾</div>
                  <h3 className="mb-2 text-xl font-bold">No Posts Found</h3>
                  <p className="text-gray-600">
                    The blog database appears to be empty. Check back soon for
                    updates!
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
