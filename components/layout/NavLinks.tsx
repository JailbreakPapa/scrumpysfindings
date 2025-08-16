import Link from 'next/link';

const NavLinks = () => {
  return (
    <nav className="mt-16 flex flex-col gap-4 md:mt-0 md:flex-row md:gap-2">
      <Link href="/" className="win96-button w-full md:w-auto inline-flex items-center justify-center">
        Projects
      </Link>
      <Link href="/blog" className="win96-button w-full md:w-auto inline-flex items-center justify-center">
        Blog
      </Link>
    </nav>
  );
};
export default NavLinks;
