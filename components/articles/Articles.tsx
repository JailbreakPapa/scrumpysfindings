import ArticleCard from './ArticleCard';

const Articles = () => {
  return (
    <section className="relative px-6 py-24 xl:px-56">
      <div>
        <h2 className="h2-bold">Highlighted articles</h2>
        <p className="regular-paragraph mt-8 max-w-[835px]">
          I share insights about what Im learning, what Im working on, Insights about The Games Industry, Middleware, and anything else that comes to mind. Here are some of my latest articles:
        </p>
      </div>

      <div className="mt-16">
        <ArticleCard />
      </div>

      <div className="projects-grid-pattern absolute inset-0 -z-10 opacity-50" />
    </section>
  );
};
export default Articles;
