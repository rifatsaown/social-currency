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
  const lineRef = useRef(null);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);

  // Initialize menu position on first render
  useEffect(() => {
    gsap.set(menuRef.current, { x: '100%', opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(menuItemsRef.current, { opacity: 0, y: 20 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left top' });
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    setIsAnimating(true);

    // Button animation on any state change
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'elastic.out(1.2, 0.5)',
        });
      },
    });

    // Icon rotation
    gsap.to(iconRef.current, {
      rotation: isMenuOpen ? 90 : 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
    });

    if (isMenuOpen) {
      // Enhanced line animation
      gsap.to(lineRef.current, {
        scaleX: 1,
        width: '100%',
        height: '100%',
        rotation: 45,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          // Fancy overlay animation
          gsap.fromTo(
            overlayRef.current,
            {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              opacity: 0,
              backdropFilter: 'blur(0px)',
            },
            {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              opacity: 1,
              backdropFilter: 'blur(10px)',
              duration: 0.8,
              ease: 'power2.out',
            }
          );

          // Menu reveal with wave effect
          gsap.fromTo(
            menuRef.current,
            { x: '100%', opacity: 0, skewX: '5deg' },
            {
              x: '0%',
              opacity: 1,
              skewX: '0deg',
              duration: 0.9,
              ease: 'expo.out',
            }
          );

          // Enhanced menu items animation
          gsap.fromTo(
            menuItemsRef.current,
            { opacity: 0, y: 40, rotationX: 30, scale: 0.8 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              stagger: 0.08,
              delay: 0.3,
              duration: 0.7,
              ease: 'back.out(1.7)',
              onComplete: () => setIsAnimating(false),
            }
          );
        },
      });
    } else {
      // Enhanced menu exit animation
      gsap.to(menuRef.current, {
        x: '100%',
        opacity: 0,
        skewX: '3deg',
        duration: 0.6,
        ease: 'power3.inOut',
      });

      // Fade out menu items with cascade effect
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: -20,
        rotationX: -15,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.in',
      });

      // Fancy overlay fade out
      gsap.to(overlayRef.current, {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.5,
        ease: 'power2.inOut',
      });

      // Line animation with spring effect
      gsap.to(lineRef.current, {
        scaleX: 0,
        width: '100%',
        height: '100%',
        rotation: 0,
        duration: 0.6,
        ease: 'elastic.out(0.5, 0.3)',
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
    <nav className="fixed top-0 right-0 z-50">
      <div className="fixed top-4 right-4 z-50">
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="p-2 md:p-3 rounded-full bg-black bg-opacity-70 text-white hover:bg-opacity-90 transition-all duration-300 
            shadow-lg hover:shadow-xl flex items-center justify-center border border-gray-700
            hover:border-purple-500 active:scale-95"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          disabled={isAnimating}
        >
          <div ref={iconRef} className="transform transition-none">
            {isMenuOpen ? (
              <X size={24} className="md:w-7 md:h-7" />
            ) : (
              <Menu size={24} className="md:w-7 md:h-7" />
            )}
          </div>
        </button>
      </div>

      {/* Overlay with improved blur effect */}
      <div
        ref={overlayRef}
        className="fixed inset-0 backdrop-blur-0 transition-all pointer-events-none bg-gradient-to-br from-black/60 to-purple-900/40"
        style={{ display: isInitialized ? 'block' : 'none' }}
      />

      {/* Line with enhanced gradient */}
      <div
        ref={lineRef}
        className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 z-40 origin-top-left"
      />

      {/* Fullscreen menu with glass morphism effect */}
      <div
        ref={menuRef}
        className="fixed inset-0 h-screen w-screen bg-black/80 text-white flex flex-col items-center justify-center space-y-8 backdrop-blur-md"
        style={{ display: isInitialized ? 'flex' : 'none' }}
      >
        {['Home', 'Features', 'About', 'Contact'].map((item, index) => (
          <a
            key={item}
            ref={(el) => {
              menuItemsRef.current[index] = el;
            }}
            href="#"
            className="text-2xl md:text-4xl font-light hover:text-transparent bg-clip-text bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-colors duration-500 relative group"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 ease-out"></span>
          </a>
        ))}
        <CustomButton
          ref={(el) => {
            menuItemsRef.current[4] = el;
          }}
          buttonText="Get Started"
        />
      </div>
    </nav>
  );
};

export default Navbar;
