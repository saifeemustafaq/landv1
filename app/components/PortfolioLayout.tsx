'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Container from './Container';

const tabs = [
  { 
    name: 'Product', 
    href: '/product',
    activeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200',
    hoverColor: 'hover:bg-rose-50 dark:hover:bg-rose-900/20'
  },
  { 
    name: 'Content', 
    href: '/content',
    activeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
    hoverColor: 'hover:bg-amber-50 dark:hover:bg-amber-900/20'
  },
  { 
    name: 'Software', 
    href: '/software',
    activeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
    hoverColor: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
  },
  { 
    name: 'Innovation', 
    href: '/innovate',
    activeColor: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-200',
    hoverColor: 'hover:bg-violet-50 dark:hover:bg-violet-900/20'
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
            <div className="retro-card p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`block px-4 py-2 rounded transition-colors ${
                      pathname === tab.href
                        ? tab.activeColor
                        : `text-gray-600 dark:text-gray-400 ${tab.hoverColor}`
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
            <div className="retro-card p-6">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 