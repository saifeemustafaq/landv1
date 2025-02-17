'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Container from './Container';

interface BasicInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
  yearsOfExperience: string;
  profilePicture: {
    relativePath: string;
    original: string;
    thumbnail: string;
  };
  updatedAt: Date;
}

export default function Hero() {
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [nameColor, setNameColor] = useState(1);

  useEffect(() => {
    // Set random color on mount and refresh
    setNameColor(Math.floor(Math.random() * 5) + 1);
  }, []);

  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching basic info...');
        const response = await fetch('/api/basic-info');
        const contentType = response.headers.get('content-type');
        
        if (!response.ok) {
          // Try to parse error details if available
          let errorDetails = 'Failed to fetch basic info';
          try {
            if (contentType && contentType.includes('application/json')) {
              const errorData = await response.json();
              errorDetails = errorData.details || errorData.error || errorDetails;
            } else {
              errorDetails = await response.text();
            }
          } catch (parseError) {
            console.error('Error parsing error response:', parseError);
          }
          
          throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
        }

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format - expected JSON');
        }

        const data = await response.json();
        console.log('Basic info fetched successfully');
        setBasicInfo(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error in fetchBasicInfo:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBasicInfo();
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="section-padding min-h-[calc(100vh-4rem)] flex items-center">
        <Container>
          <div className="retro-card p-8 text-center">
            <div className="animate-pulse">
              <div className="h-48 w-48 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-8" />
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/4 mx-auto mb-8" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding min-h-[calc(100vh-4rem)] flex items-center">
        <Container>
          <div className="retro-card p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Profile</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="retro-button"
              >
                Retry
              </button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="about" className="section-padding min-h-[calc(100vh-4rem)] flex items-center">
      <Container>
        <div className="retro-card p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Picture */}
            <div className="group relative w-48 h-48">
              {/* Shadow layer - placed behind the image */}
              <div className="absolute inset-0 rounded-full bg-black/60 dark:bg-white/60 transform translate-x-[2px] translate-y-[2px] transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:translate-y-[3px]"></div>
              {/* Main image container */}
              <div className="absolute inset-0 rounded-full overflow-hidden bg-white dark:bg-gray-900 border-[1.5px] border-black/80 dark:border-white/80 transition-all duration-300 ease-out transform group-hover:-translate-x-[0.5px] group-hover:-translate-y-[0.5px]">
                {basicInfo?.profilePicture && !imageError ? (
                  <Image
                    src={basicInfo.profilePicture.original}
                    alt="Profile picture"
                    fill
                    className="object-cover rounded-full transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    priority
                    sizes="(max-width: 768px) 192px, 192px"
                    onError={() => {
                      console.error('Error loading profile picture, falling back to placeholder');
                      setImageError(true);
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-full">
                    <span className="text-4xl">MS</span>
                  </div>
                )}
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 vt323-regular">
                <div className="name-wrapper relative inline-block">
                  <span 
                    className="invisible" 
                    aria-hidden="true"
                    
                  >
                    Hi, I&apos;m Mustafa Saifee
                  </span>
                  <svg 
                    className="animated-text absolute left-0 top-0 w-full h-full vt323-regular" 
                    viewBox="0 0 900 65"
                    data-color={nameColor}
                  >
                    <text 
                      x="0" 
                      y="65"
                      style={{
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontSize: '80px',
                        fontWeight: 'bold'
                      }}
                    >
                      <tspan className="non-animated">Hi, I&apos;m </tspan>
                      <tspan className="animated">Mustafa Saifee</tspan>
                    </text>
                    <text 
                      x="0" 
                      y="65"
                      style={{
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontSize: '80px',
                        fontWeight: 'bold'
                      }}
                    >
                      <tspan className="non-animated">Hi, I&apos;m </tspan>
                      <tspan className="animated">Mustafa Saifee</tspan>
                    </text>
                  </svg>
                </div>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-4">
                Product Manager at Microsoft
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                I&apos;m a software engineer passionate about building innovative solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, '#contact')}
                  className="retro-button inline-block"
                >
                  Get in touch
                </a>
                <a 
                  href="https://www.linkedin.com/in/saifeemustafa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-button inline-block"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/saifeemustafaq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-button inline-block"
                >
                  GitHub
                </a>
                <a 
                  href="https://x.com/mustafasaifee_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-button inline-block"
                >
                  Twitter
                </a>
                <a 
                  href="#portfolio"
                  onClick={(e) => handleSmoothScroll(e, '#portfolio')}
                  className="retro-button inline-block"
                >
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 