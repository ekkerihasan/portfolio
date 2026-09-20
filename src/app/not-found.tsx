import Link from 'next/link';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg md:text-xl max-w-md mx-auto mb-8 opacity-80">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-colors bg-basalt text-bone hover:opacity-90"
        >
          Return Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
