'use client';

import { useState, useEffect } from 'react';

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

interface PortfolioPageProps {
  category: string;
}

export default function PortfolioPage({ category }: PortfolioPageProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects?category=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [category]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!projects.length) {
    return <div className="text-center">No projects found</div>;
  }

  return (
    <div className="retro-card-reverse p-6 w-full overflow-hidden">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 truncate">All Projects</h2>
      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <div key={project._id} className="retro-card-reverse hover:shadow-lg transition-shadow p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Left Side */}
              <div className="flex flex-col justify-between w-full md:w-48 flex-shrink-0">
                {/* Image Container */}
                {project.image && (
                  <div className="mb-4 w-full md:w-48 h-32 flex-shrink-0">
                    <img
                      className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      src={project.image.thumbnail}
                      alt={project.title}
                    />
                  </div>
                )}
                
                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-sm rounded-full inline-block whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-button text-center w-full"
                >
                  View Project
                </a>
              </div>

              {/* Right Side */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50 truncate">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 break-words line-clamp-3">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 