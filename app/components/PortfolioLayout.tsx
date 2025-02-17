'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
            <div className="sticky top-4 retro-card-reverse p-4">
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
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
} 