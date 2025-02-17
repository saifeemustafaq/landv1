'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Container from './Container';

const tabs = [
  { 
    name: 'Product', 
    href: '/product'
  },
  { 
    name: 'Content', 
    href: '/content'
  },
  { 
    name: 'Software', 
    href: '/software'
  },
  { 
    name: 'Innovation', 
    href: '/innovate'
  },
];

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <Container>
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="retro-card-reverse p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`block px-4 py-2 rounded-full transition-colors border-2 border-transparent
                      ${pathname === tab.href
                        ? 'bg-gray-900 text-white font-bold dark:bg-gray-50 dark:text-gray-900'
                        : 'text-gray-900 dark:text-gray-50 hover:border-gray-900 dark:hover:border-gray-50'
                      }`}
                  >
                    {tab.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="retro-card-reverse p-6">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 