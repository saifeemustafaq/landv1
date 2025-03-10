'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Container from './Container';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

// Pastel color combinations for different experiences
const EXPERIENCE_COLORS = [
  { text: 'text-rose-600 dark:text-rose-400' },
  { text: 'text-amber-600 dark:text-amber-400' },
  { text: 'text-sky-600 dark:text-sky-400' },
  { text: 'text-emerald-600 dark:text-emerald-400' },
  { text: 'text-violet-600 dark:text-violet-400' },
];

interface ExperienceType {
  _id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string | null;
  isPresent: boolean;
  description: string;
  website: string;
  companyLogo: {
    relativePath: string;
    original: string;
    thumbnail: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experiences');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch experiences: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched experiences:', data);
        data.forEach((exp: ExperienceType) => {
          console.log(`Logo URL for ${exp.companyName}:`, exp.companyLogo);
        });
        setExperiences(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load experiences';
        console.error('Error fetching experiences:', errorMessage);
        setError('Failed to load experiences. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section id="experience" className="pt-24 pb-16 scroll-mt-32">
      <Container>
        <div className="retro-card-reverse p-8">
          <h2 className="text-4xl font-bold mb-8 vt323-regular">Work Experience</h2>
          
          <div className="space-y-6">
            {experiences.length === 0 ? (
              <div className="text-center text-gray-600 dark:text-gray-400">
                No work experiences found.
              </div>
            ) : (
              experiences.map((experience, index) => {
                // Get color scheme based on index, cycling through the array
                const colorScheme = EXPERIENCE_COLORS[index % EXPERIENCE_COLORS.length];
                
                return (
                  <div 
                    key={experience._id} 
                    className="bg-white dark:bg-gray-800/50 rounded-lg border-2 border-gray-800 dark:border-gray-600 transition-all duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)]"
                  >
                    {/* Header Section */}
                    <div className="p-6 pb-4">
                      <div className="flex gap-6">
                        {experience.companyLogo && (
                          experience.website ? (
                            <a 
                              href={experience.website}
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="relative w-24 h-24 flex-shrink-0 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200"
                            >
                              <Image
                                src={experience.companyLogo.original}
                                alt={`${experience.companyName} logo`}
                                fill
                                className="object-contain p-1"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                unoptimized={true}
                                onError={(e) => {
                                  console.error(`Error loading logo for ${experience.companyName}:`, e);
                                }}
                              />
                            </a>
                          ) : (
                            <div className="relative w-24 h-24 flex-shrink-0 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-800">
                              <Image
                                src={experience.companyLogo.original}
                                alt={`${experience.companyName} logo`}
                                fill
                                className="object-contain p-1"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                unoptimized={true}
                                onError={(e) => {
                                  console.error(`Error loading logo for ${experience.companyName}:`, e);
                                }}
                              />
                            </div>
                          )
                        )}
                        
                        <div className="flex-grow">
                          <div className="flex flex-col gap-2">
                            <h4 className={`text-xl font-bold ${colorScheme.text}`}>
                              {experience.position}
                            </h4>
                            {experience.website ? (
                              <a 
                                href={experience.website}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-lg text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                {experience.companyName}
                              </a>
                            ) : (
                              <p className="text-lg text-blue-600 dark:text-blue-400">
                                {experience.companyName}
                              </p>
                            )}
                            <p className="text-gray-600 dark:text-gray-400 font-medium">
                              {format(new Date(experience.startDate), 'MMM yyyy')} -{' '}
                              {experience.isPresent ? (
                                <span className="text-green-600 dark:text-green-400">Present</span>
                              ) : (
                                format(new Date(experience.endDate!), 'MMM yyyy')
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 dark:bg-gray-600" />

                    {/* Description Section */}
                    <div className="p-6 pt-4">
                      <div className="text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none [&>p:first-child]:mt-0 [&>*:first-child]:mt-0">
                        <ReactMarkdown 
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            u: (props) => <span className="border-b border-gray-900 dark:border-gray-100" {...props} />
                          }}
                        >
                          {experience.description}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Container>
    </section>
  );
} 