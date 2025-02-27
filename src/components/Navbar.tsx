import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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

  // Initialize menu position on first render
  useEffect(() => {
    gsap.set(menuRef.current, { x: '-100%', opacity: 0 }); // Changed to start from left (-100%)
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(menuItemsRef.current, { opacity: 0, y: 20 });
    gsap.set(lineRef.current, {
      scaleX: 0,
      scaleY: 0, // Initial scaleY is 0
      transformOrigin: 'left top',
    });
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    setIsAnimating(true);

    // Button animation on any state change - more tactile feedback
    gsap.to(buttonRef.current, {
      scale: 0.85,
      duration: 0.15,
      ease: 'power1.out',
      onComplete: () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'elastic.out(1.2, 0.5)',
        });
      },
    });

    // Icon rotation with better animation
    gsap.to(iconRef.current, {
      rotation: isMenuOpen ? 180 : 0, // Full rotation for more dramatic effect
      duration: 0.4,
      ease: 'back.out(1.7)',
    });

    if (isMenuOpen) {
      // Enhanced line animation
      gsap.to(lineRef.current, {
        scaleX: 1,
        scaleY: 1, // Animate scaleY to 1
        width: '150vw', // Make it wider
        height: '150vh', // Make it taller
        duration: 0.6, // Faster animation for mobile
        ease: 'power2.inOut',
        onComplete: () => {
          // Fancy overlay animation optimized for mobile
          gsap.fromTo(
            overlayRef.current,
            {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              opacity: 0,
              backdropFilter: 'blur(0px)',
            },
            {
              backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker background for better mobile readability
              opacity: 1,
              backdropFilter: 'blur(8px)', // Less blur for better performance
              duration: 0.5, // Faster for mobile
              ease: 'power2.out',
            }
          );

          // Menu reveal with slide from left to right
          gsap.fromTo(
            menuRef.current,
            { x: '-100%', opacity: 0, skewX: '-5deg' }, // Start from left side
            {
              x: '0%',
              opacity: 1,
              skewX: '0deg',
              duration: 0.6, // Faster for mobile
              ease: 'expo.out',
            }
          );

          // Enhanced menu items animation - simpler on mobile for better performance
          gsap.fromTo(
            menuItemsRef.current.slice(0, 4), // Animate only the first 4 items (links)
            { opacity: 0, y: 20, scale: 0.9 }, // Less extreme animation starts for mobile
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.05, // Faster stagger for mobile
              delay: 0.2, // Less delay for mobile
              duration: 0.4, // Faster duration for mobile
              ease: 'back.out(1.5)',
            }
          );

          // CustomButton specific animation
          gsap.fromTo(
            menuItemsRef.current[4], // CustomButton is the 5th item
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              delay: 0.4, // Less delay for mobile
              duration: 0.4, // Faster for mobile
              ease: 'back.out(1.5)',
              onComplete: () => setIsAnimating(false),
            }
          );
        },
      });
    } else {
      // Enhanced menu exit animation - slide from right to left (opposite direction)
      gsap.to(menuRef.current, {
        x: '-100%', // Exit to the left
        opacity: 0,
        skewX: '-2deg', // Match the entry skew direction
        duration: 0.4, // Faster for mobile
        ease: 'power2.inOut',
      });

      // Fade out menu items with simplified cascade effect for mobile
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: -10, // Less extreme for mobile
        stagger: 0.03, // Faster for mobile
        duration: 0.3, // Faster for mobile
        ease: 'power2.in',
      });

      // Fancy overlay fade out - optimized for mobile
      gsap.to(overlayRef.current, {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.4, // Faster for mobile
        ease: 'power2.inOut',
      });

      // Line animation with spring effect
      gsap.to(lineRef.current, {
        scaleX: 0,
        scaleY: 0, // Animate scaleY back to 0
        width: '100%',
        height: '100%',
        duration: 0.4, // Faster for mobile
        ease: 'power2.out',
        onComplete: () => setIsAnimating(false),
      });
    }
  }, [isMenuOpen, isInitialized]);

  // Toggle menu handler with debounce
  const toggleMenu = () => {
    if (!isAnimating) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <nav className="fixed top-0 right-0 z-50 w-full">
      {/* Mobile-optimized hamburger button */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="p-2 sm:p-3 rounded-full bg-black bg-opacity-80 text-white hover:bg-opacity-95 transition-all duration-200
          shadow-lg hover:shadow-purple-500/30 flex items-center justify-center border border-gray-700
          hover:border-purple-500 active:scale-95 touch-manipulation"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          disabled={isAnimating}
          style={{ WebkitTapHighlightColor: 'transparent' }} // Remove tap highlight on mobile
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

      {/* Overlay with improved blur effect - mobile optimized */}
      <div
        ref={overlayRef}
        className="fixed inset-0 backdrop-blur-0 transition-all pointer-events-none bg-gradient-to-br from-black/80 to-purple-900/50"
        style={{ display: isInitialized ? 'block' : 'none' }}
      />

      {/* Line with enhanced gradient - mobile optimized */}
      <div
        ref={lineRef}
        className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 origin-top-left"
      />

      {/* Fullscreen menu with glass morphism effect - mobile optimized */}
      <div
        ref={menuRef}
        className="fixed inset-0 h-screen w-screen bg-black/85 text-white flex flex-col items-center justify-center space-y-5 sm:space-y-8 backdrop-blur-2xl"
        style={{ display: isInitialized ? 'flex' : 'none' }}
      >
        <div className="w-full max-w-md px-6 flex flex-col items-center">
          {['Home', 'Features', 'About', 'Contact'].map((item, index) => (
            <a
              key={item}
              ref={(el) => {
                menuItemsRef.current[index] = el;
              }}
              href="#"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light py-3 my-1
              hover:text-transparent bg-clip-text bg-gradient-to-r hover:from-purple-400 hover:to-pink-400
              transition-colors duration-300 relative group w-full text-center"
            >
              {item}
              <span
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5
                bg-gradient-to-r from-purple-500 to-pink-500
                group-hover:w-3/4 transition-all duration-300 ease-out"
              ></span>
            </a>
          ))}
          <div className="mt-4 sm:mt-6">
            <CustomButton
              ref={(el) => {
                menuItemsRef.current[4] = el;
              }}
              buttonText="Get Started"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;