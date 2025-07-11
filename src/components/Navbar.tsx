import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logo } from '../asset';
import CustomButton from './Button/CustomButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>(
    []
  );
  const lineRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const location = useLocation();

  // Initialize menu position on first render
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set(menuRef.current, { x: '-100%', opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(menuItemsRef.current, { opacity: 0, y: 20 });
    gsap.set(lineRef.current, {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: 'left top',
    });
    gsap.set(logoRef.current, {
      opacity: 0,
      scale: 0.05,
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.05 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power4.out' },
      '-=0.2'
    );

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    setIsAnimating(true);

    // Button animation - faster and smoother
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.15,
      ease: 'power3.easeInOut',
      onComplete: () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.25,
          ease: 'power3.easeInOut',
        });
      },
    });

    // Icon rotation - faster and smoother
    gsap.to(iconRef.current, {
      rotation: isMenuOpen ? 180 : 0,
      duration: 0.3,
      ease: 'power3.easeInOut',
    });

    if (isMenuOpen) {
      // Line animation - faster and smoother
      gsap.to(lineRef.current, {
        scaleX: 1,
        scaleY: 1,
        width: '150vw',
        height: '150vh',
        duration: 0.45,
        ease: 'power3.easeInOut',
        onComplete: () => {
          // Overlay animation - faster and smoother
          gsap.fromTo(
            overlayRef.current,
            {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              opacity: 0,
              backdropFilter: 'blur(0px)',
            },
            {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              opacity: 1,
              backdropFilter: 'blur(8px)',
              duration: 0.4,
              ease: 'power3.easeInOut',
            }
          );

          // Menu reveal - faster and smoother
          gsap.fromTo(
            menuRef.current,
            { x: '-100%', opacity: 0, skewX: '-5deg' },
            {
              x: '0%',
              opacity: 1,
              skewX: '0deg',
              duration: 0.45,
              ease: 'expo.easeInOut',
            }
          );

          // Menu items animation - faster and smoother
          gsap.fromTo(
            menuItemsRef.current.slice(0, 4),
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.07,
              delay: 0.15,
              duration: 0.35,
              ease: 'power3.easeInOut',
            }
          );

          // CustomButton animation - faster and smoother
          gsap.fromTo(
            menuItemsRef.current[4],
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              delay: 0.25,
              duration: 0.35,
              ease: 'power3.easeInOut',
              onComplete: () => setIsAnimating(false),
            }
          );
        },
      });
    } else {
      // Menu exit animation - faster and smoother
      gsap.to(menuRef.current, {
        x: '-100%',
        opacity: 0,
        skewX: '-2deg',
        duration: 0.35,
        ease: 'power3.easeInOut',
      });

      // Menu items fade - faster and smoother
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: -10,
        stagger: 0.04,
        duration: 0.25,
        ease: 'power2.easeInOut',
      });

      // Overlay fade - faster and smoother
      gsap.to(overlayRef.current, {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.35,
        ease: 'power3.easeInOut',
      });

      // Line animation - faster and smoother
      gsap.to(lineRef.current, {
        scaleX: 0,
        scaleY: 0,
        width: '100%',
        height: '100%',
        duration: 0.35,
        ease: 'power3.easeInOut',
        onComplete: () => setIsAnimating(false),
      });
    }
  }, [isMenuOpen, isInitialized]);

  // Toggle menu handler
  const toggleMenu = () => {
    if (!isAnimating) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 right-0 z-50 w-full">
      <div className="absolute top-4 left-4 z-20">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Company Logo"
            className="h-12 w-auto"
            ref={logoRef}
          />
          <h2 className="font-bold text-2xl">INFLUZIO</h2>
        </Link>
      </div>

      {/* Hamburger button */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="p-2 sm:p-3 rounded-full bg-black bg-opacity-80 text-white hover:bg-opacity-95 transition-all duration-200
          shadow-lg hover:shadow-purple-500/30 flex items-center justify-center border border-gray-700
          hover:border-purple-500 active:scale-95 touch-manipulation"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          disabled={isAnimating}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div ref={iconRef} className="transform transition-none">
            {isMenuOpen ? (
              <X size={22} className="sm:w-6 sm:h-6" />
            ) : (
              <Menu size={22} className="sm:w-6 sm:h-6" />
            )}
          </div>
        </button>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 backdrop-blur-0 transition-all pointer-events-none bg-gradient-to-br from-black/80 to-purple-900/50"
        style={{ display: isInitialized ? 'block' : 'none' }}
      />

      {/* Line */}
      <div
        ref={lineRef}
        className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 origin-top-left"
      />

      {/* Fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 h-screen w-screen bg-black/85 text-white flex flex-col items-center justify-center space-y-5 sm:space-y-8 backdrop-blur-2xl"
        style={{ display: isInitialized ? 'flex' : 'none' }}
      >
        <div className="w-full max-w-md px-6 flex flex-col items-center">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Privacy Policy', path: '/privacy' },
            { name: 'Terms & Conditions', path: '/terms' },
            // { name: 'Features', path: '/#features' },
            // { name: 'Cards', path: '/#cards' },
            { name: 'Contact', path: '/contact-us' },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              ref={(el) => {
                menuItemsRef.current[index] = el;
              }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light py-3 my-1
              hover:text-transparent bg-clip-text bg-gradient-to-r hover:from-purple-400 hover:to-pink-400
              transition-colors duration-300 relative group w-full text-center"
            >
              {item.name.toUpperCase()}
              <span
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5
                bg-gradient-to-r from-purple-500 to-pink-500
                group-hover:w-3/4 transition-all duration-300 ease-out"
              ></span>
            </Link>
          ))}
          <div className="mt-4 sm:mt-6">
            <Link to="/apply-now">
              <CustomButton
                ref={(el) => {
                  menuItemsRef.current[4] = el;
                }}
                buttonText="Get Started"
              />
            </Link>
          </div>
          <div className="mt-4 sm:mt-6">
            <Link to="/login">
              <CustomButton buttonText="Log In" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
