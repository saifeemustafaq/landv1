import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface ProjectCarouselProps {
  projects: Project[];
}

const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // If no projects, show loading or return null
  if (!projects || projects.length === 0) {
    return (
      <div className="relative w-full h-[400px] animate-pulse flex items-center justify-center">
        <div className="text-gray-900 dark:text-white text-xl">Loading projects...</div>
      </div>
    );
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = projects.length - 1;
      if (newIndex >= projects.length) newIndex = 0;
      return newIndex;
    });
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full mt-16">
      {/* Outer container with padding for arrows */}
      <div className="relative px-16">
        {/* Container for the slide */}
        <div className="relative h-[400px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 26 },
                opacity: { duration: 0.3 }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="w-full h-full relative rounded-lg overflow-hidden bg-white dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700 shadow-md">
                <div className="flex flex-col h-full max-w-4xl mx-auto">
                  {/* Content Container */}
                  <div className="flex-1 overflow-hidden">
                    {/* Top Row: Image and Title */}
                    <div className="flex gap-8 mb-6">
                      {/* Image Container */}
                      <div className="w-48 h-32 flex-shrink-0">
                        {currentProject.image && (
                          <img
                            className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                            src={currentProject.image.thumbnail}
                            alt={currentProject.title}
                          />
                        )}
                      </div>
                      
                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white break-words line-clamp-2">
                          {currentProject.title}
                        </h2>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="overflow-y-auto pr-2" style={{ maxHeight: 'calc(100% - 140px)' }}>
                      <p className="text-lg text-gray-600 dark:text-gray-300 break-words">
                        {currentProject.description}
                      </p>
                    </div>
                  </div>

                  {/* View Project Button - Fixed at bottom */}
                  <div className="mt-6 flex justify-end">
                    <a
                      href={currentProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-lg font-medium"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows - Now outside the card content */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-20 shadow-lg"
          onClick={() => paginate(-1)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-20 shadow-lg"
          onClick={() => paginate(1)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex 
                ? 'bg-gray-900 dark:bg-white' 
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel; 