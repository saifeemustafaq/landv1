import Container from './Container';
import Link from 'next/link';

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding scroll-mt-24">
      <Container>
        <div className="retro-card p-8">
          <h2 className="text-3xl font-bold mb-8">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Portfolio Card */}
            <div className="retro-card flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4">Product Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Explore my product design and management projects.
                </p>
              </div>
              <Link href="/product" className="retro-button w-full text-center">
                View Portfolio
              </Link>
            </div>

            {/* Content Portfolio Card */}
            <div className="retro-card flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4">Content Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  View my content creation and writing samples.
                </p>
              </div>
              <Link href="/content" className="retro-button w-full text-center">
                View Portfolio
              </Link>
            </div>

            {/* Software Portfolio Card */}
            <div className="retro-card flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4">Software Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Check out my software development projects.
                </p>
              </div>
              <Link href="/software" className="retro-button w-full text-center">
                View Portfolio
              </Link>
            </div>

            {/* Innovation Portfolio Card */}
            <div className="retro-card flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4">Innovation Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Discover my innovative ideas and side projects.
                </p>
              </div>
              <Link href="/innovate" className="retro-button w-full text-center">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 