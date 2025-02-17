import Container from './Container';
import Link from 'next/link';

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding scroll-mt-24">
      <Container>
        <div className="retro-card-reverse p-8">
          <h2 className="text-4xl font-bold mb-8 vt323-regular">Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Product Portfolio Card */}
            <div className="retro-card-reverse p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4">Product Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Step into my world of product innovation. From concept to launch, witness how I transform ideas into impactful solutions.
                </p>
              </div>
              <Link href="/product" className="retro-button w-full text-center">
                View Portfolio
              </Link>
            </div>

            {/* Content Portfolio Card */}
            <div className="retro-card-reverse p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4">Content Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Dive into my creative universe. Experience storytelling that captivates, informs, and leaves a lasting impression.
                </p>
              </div>
              <Link href="/content" className="retro-button w-full text-center">
                View Portfolio
              </Link>
            </div>

            {/* Software Portfolio Card */}
            <div className="retro-card-reverse p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4">Software Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Explore the code that powers innovation. From elegant solutions to complex challenges, see how I bring ideas to life.
                </p>
              </div>
              <Link href="/software" className="retro-button w-full text-center">
                View Portfolio
              </Link>
            </div>

            {/* Innovation Portfolio Card */}
            <div className="retro-card-reverse p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4">Innovation Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Welcome to my innovation playground. Discover boundary-pushing experiments and passion projects that challenge the status quo.
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