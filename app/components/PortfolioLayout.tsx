'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';
import ProjectCarousel from './ProjectCarousel';
import { useEffect, useState } from 'react';

interface Project {
  _id: string;
  title: string;
  description: string;
  image: {
    original: string;
    thumbnail: string;
  };
  link: string;
  tags: string[];
  skills: string[];
}

const tabs = [
  { 
    name: 'Product', 
    href: '/product',
    category: 'product'
  },
  { 
    name: 'Content', 
    href: '/content',
    category: 'content'
  },
  { 
    name: 'Software', 
    href: '/software',
    category: 'software'
  },
  { 
    name: 'Innovation', 
    href: '/innovation',
    category: 'innovation'
  },
];

const navItems = [
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Contact', href: '/#contact' },
];

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [projects, setProjects] = useState<Project[]>([]);
  
  const currentTab = tabs.find(tab => tab.href === pathname);
  const category = currentTab?.category || '';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects?category=${category}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    if (category) {
      fetchProjects();
    }
  }, [category]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Navbar */}
      <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 py-3 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <Container>
          <div className="flex justify-between items-center max-w-full">
            <Link href="/" className="retro-button !p-3 w-12 h-12 flex items-center justify-center">
              <Image
                src="/ms-logo.svg"
                alt="MS Logo"
                width={24}
                height={24}
                className="dark:invert"
              />
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="retro-button"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </nav>

      {/* Main Content with top padding for navbar */}
      <div className="pt-20">
        {/* Carousel Section - Full Width */}
        <div className="w-full mb-12">
          <Container>
            <ProjectCarousel projects={projects} />
          </Container>
        </div>

        {/* Main Content Area */}
        <Container>
          <div className="flex gap-8">
            {/* Sticky Sidebar */}
            <div className="w-64 flex-shrink-0">
              <div className="sticky top-24 retro-card-reverse p-4">
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
            <div className="flex-1 min-w-0 overflow-hidden">
              {children}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
} 