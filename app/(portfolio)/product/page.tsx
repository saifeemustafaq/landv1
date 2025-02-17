'use client';

import { useState, useEffect } from 'react';
import ProjectCarousel from '@/app/components/ProjectCarousel';

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

export default function ProductPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects?category=product');
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
  }, []);

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
    <>
      <div className="retro-card-reverse p-6">
        <ProjectCarousel projects={projects} />
      </div>

      <div className="retro-card-reverse p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">All Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {project.image && (
                <img
                  className="w-full h-48 object-cover"
                  src={project.image.thumbnail}
                  alt={project.title}
                />
              )}
              <div className="p-6">
              
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-50 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 bg-gray-50 text-sm rounded-full">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View Project
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 