import Link from 'next/link';

const Logo = ({ isLogoFooter = false }: { isLogoFooter?: boolean }) => {
  return (
    <Link
      href="/"
      className={`text-code font-bold uppercase ${
        isLogoFooter ? 'text-3xl' : 'text-2xl'
      }`}
    >
      <span className="text-valencia">M</span>
      <span className="text-supernova">i</span>
      <span className="text-cerise">k</span>
      <span className="text-azureradiance">a</span>
      <span className="text-azureradiance">e</span>
      <span className="text-cerise">l</span>
      <span className="text-azureradiance">.</span>
      <span className="text-oceangreen">ab</span>
      <span className="text-roseofsharon">oa</span>
      <span className="text-brickred">gy</span>
      <span className="text-tanhide">e</span>
    </Link>
  );
};
export default Logo;
