import Container from './Container';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

export default function Contact() {
  return (
    <section id="contact" className="section-padding dark:bg-gray-900 scroll-mt-24">
      <Container>
        <div className="retro-card-reverse p-8">
          <h2 className="text-4xl font-bold mb-6 vt323-regular">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Feel free to reach out for opportunities or just to say hi! I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <div className="flex flex-col space-y-6">
            {/* Contact Info */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3 hover:text-accent transition-colors">
                <HiOutlineMail className="w-5 h-5" />
                <a 
                  href="mailto:saifeemustafaq@gmail.com" 
                  className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
                >
                  saifeemustafaq@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 hover:text-accent transition-colors">
                <HiOutlinePhone className="w-5 h-5" />
                <a 
                  href="tel:+16504396380" 
                  className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
                >
                  +1 (650) 439-6380
                </a>
              </div>
              <div className="flex items-center space-x-3 hover:text-accent transition-colors">
                <HiOutlineLocationMarker className="w-5 h-5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Seattle, Washington
                </span>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="mailto:saifeemustafaq@gmail.com"
                className="retro-button"
              >
                Send Email
              </a>
              <a 
                href="tel:+16504396380"
                className="retro-button"
              >
                Call Me
              </a>
              <a 
                href="sms:+16504396380"
                className="retro-button"
              >
                Send SMS
              </a>
              <a 
                href="https://wa.me/16504396380"
                target="_blank"
                rel="noopener noreferrer"
                className="retro-button"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 