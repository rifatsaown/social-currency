import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import { memo, useCallback, useEffect, useMemo } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Memoized social icons component
const SocialIcons = memo(({ iconVariants }: { iconVariants: Variants }) => (
  <motion.div
    className="flex space-x-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
  >
    <motion.a
      href="#"
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
  ({
    href,
    children,
    variants,
  }: {
    href: string;
    children: React.ReactNode;
    variants: Variants;
  }) => (
    <motion.a
      href={href}
      className="text-gray-400 hover:text-white"
      variants={variants}
      whileHover="hover"
    >
      {children}
    </motion.a>
  )
);

const Footer = () => {
  // Memoize animation variants
  const listItemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: 'easeOut',
          staggerChildren: 0.05,
        },
      },
    }),
    []
  );

  const linkVariants = useMemo(
    () => ({
      hover: {
        scale: 1.1,
        color: '#fff',
        transition: { duration: 0.2 },
      },
    }),
    []
  );

  const iconVariants = useMemo(
    () => ({
      hover: {
        rotate: 360,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
    }),
    []
  );

  // Optimize GSAP animation with useCallback
  const initGSAPAnimation = useCallback(() => {
    const footerElement = document.querySelector('footer');
    if (!footerElement) return;

    gsap.fromTo(
      footerElement,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: footerElement,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  useEffect(() => {
    initGSAPAnimation();
  }, [initGSAPAnimation]);

  // Memoize contact information
  const contactInfo = useMemo(
    () => [
      {
        icon: MapPin,
        text: '123 Fintech Street, Dhaka, Bangladesh',
        className: 'items-start',
      },
      {
        icon: Phone,
        text: '+88 (016) 123-4567',
        className: 'items-center',
      },
      {
        icon: Mail,
        text: 'rifatsaown0@gmail.com',
        className: 'items-center',
      },
    ],
    []
  );

  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-8">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path d="M20 20 L40 20 L40 40 L20 40 Z" fill="white" />
                <path d="M60 20 L80 20 L80 40 L60 40 Z" fill="white" />
                <path d="M40 40 L60 40 L60 60 L40 60 Z" fill="white" />
                <path d="M20 60 L40 60 L40 80 L20 80 Z" fill="white" />
                <path d="M60 60 L80 60 L80 80 L60 80 Z" fill="white" />
              </svg>
              <h2 className="text-white text-2xl font-bold">INFLUZIO</h2>
            </motion.div>
            <motion.p
              className="text-gray-400 mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            >
              Revolutionizing banking with social currency.
            </motion.p>
            <SocialIcons iconVariants={iconVariants} />
          </div>

          {/* Card Options Section */}
          <div>
            <motion.h3
              className="text-white text-lg font-medium mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            >
              Card Options
            </motion.h3>
            <motion.ul
              className="space-y-4"
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                'Standard Card',
                'Premium Card',
                'Influencer Card',
                'Benefits',
                'Apply Now',
              ].map((text, index) => (
                <li key={index}>
                  <FooterLink href="#" variants={linkVariants}>
                    {text}
                  </FooterLink>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Company Section */}
          <div>
            <motion.h3
              className="text-white text-lg font-medium mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            >
              Company
            </motion.h3>
            <motion.ul
              className="space-y-4"
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
            >
              {['About Us', 'Our Story', 'Blog', 'Careers', 'Press'].map(
                (text, index) => (
                  <li key={index}>
                    <FooterLink href="#" variants={linkVariants}>
                      {text}
                    </FooterLink>
                  </li>
                )
              )}
            </motion.ul>
          </div>

          {/* Contact Section */}
          <div>
            <motion.h3
              className="text-white text-lg font-medium mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            >
              Contact Us
            </motion.h3>
            <motion.ul
              className="space-y-4"
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
            >
              {contactInfo.map((item, index) => (
                <li key={index} className={`flex ${item.className}`}>
                  <item.icon className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                  <span className="text-gray-400">{item.text}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        <motion.div
          className="mt-12 border-t border-gray-800 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} INFLUZIO. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            {[
              'Privacy Policy',
              'Terms of Service',
              'Card Agreement',
              'Refund Policy',
            ].map((text, index) => (
              <FooterLink key={index} href="#" variants={linkVariants}>
                {text}
              </FooterLink>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default memo(Footer);
