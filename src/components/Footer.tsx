import { motion, Variants } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../asset';

// Memoized social icons component
const SocialIcons = memo(({ iconVariants }: { iconVariants: Variants }) => (
  <motion.div
    className="flex space-x-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <motion.a
      href="https://instagram.com/influzio_"
      target="_blank"
      className="text-gray-400 hover:text-white"
      variants={iconVariants}
      whileHover="hover"
    >
      <span className="sr-only">Instagram</span>
      <Instagram className="h-6 w-6" />
    </motion.a>
    <motion.a
      href="#"
      className="text-gray-400 hover:text-white"
      variants={iconVariants}
      whileHover="hover"
    >
      <span className="sr-only">Twitter</span>
      <Twitter className="h-6 w-6" />
    </motion.a>
    <motion.a
      href="#"
      className="text-gray-400 hover:text-white"
      variants={iconVariants}
      whileHover="hover"
    >
      <span className="sr-only">Facebook</span>
      <Facebook className="h-6 w-6" />
    </motion.a>
  </motion.div>
));

// Memoized footer link component
const FooterLink = memo(
  ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link to={href} className="text-gray-400 hover:text-white">
      {children}
    </Link>
  )
);

const Footer = () => {
  // Simplified animation variants
  const iconVariants = useMemo(
    () => ({
      hover: {
        scale: 1.1,
        transition: {
          duration: 0.3,
        },
      },
    }),
    []
  );

  // Optimize animation with useCallback
  const observeFooter = useCallback(() => {
    const footer = document.querySelector('footer');
    if (!footer || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.classList.add('footer-visible');
            observer.unobserve(footer);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  useEffect(() => {
    observeFooter();
  }, [observeFooter]);

  // Memoize contact information
  const contactInfo = useMemo(
    () => [
      {
        icon: MapPin,
        text: 'United Kingdom',
        className: 'items-start',
      },
      {
        icon: Phone,
        text: '+44 7496 342877',
        className: 'items-center',
      },
      {
        icon: Mail,
        text: 'info@influzio.com',
        className: 'items-center',
      },
    ],
    []
  );

  return (
    <footer className="bg-black footer-animation">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src={logo} alt="Company Logo" className="h-12 w-auto" />
                <h2 className="font-bold text-2xl">INFLUZIO</h2>
              </Link>
            </div>
            <p className="text-gray-400 mt-2">
              The UK's 1st influence-powered cashback platform.
            </p>
            <SocialIcons iconVariants={iconVariants} />
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { text: 'Benefits', href: '/#benefits-section' },
                { text: 'Apply Now', href: '/apply-now' },
              ].map((text, index) => (
                <li key={index}>
                  <FooterLink href={text.href}>{text.text}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-4">
              {[
                { text: 'About Us', href: '/about' },
                { text: 'Privacy Policy', href: '/privacy' },
                { text: 'Terms and Conditions', href: '/terms' },
              ].map((text, index) => (
                <li key={index}>
                  <FooterLink href={text.href}>{text.text}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className={`flex ${item.className}`}>
                  <item.icon className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                  <span className="text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} INFLUZIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
