import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const ArticleCard = () => {
  return (
    <Link
      href="https://medium.com/@mike.amanfo12/licensing-game-middleware-sucks-c885a7b7194a"
      target="_blank"
    >
      <Card className="max-w-[1200px] border-none bg-background shadow-2xl transition-all hover:-translate-y-1.5 hover:bg-[#1a1a1a4d]">
        <CardHeader className="space-y-3">
          <CardTitle className="text-white">
            My opinion on Game Middleware, and how it can change...
          </CardTitle>
          <CardDescription className="text-silverchalice">
          </CardDescription>
        </CardHeader>
        <CardFooter className="text-gray-400">
          4 min read · Dec 21, 2024
        </CardFooter>
      </Card>
    </Link>
  );
};
export default ArticleCard;
