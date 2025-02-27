import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CustomButton from './Button/CustomButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // Add state to track animation
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>(
    []
  );
  const lineRef = useRef(null);

  // Initialize menu position on first render
  useEffect(() => {
    gsap.set(menuRef.current, { x: '100%', opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(menuItemsRef.current, { opacity: 0, y: 20 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left top' }); // Initialize line
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    setIsAnimating(true); // Set animating state when menu state changes

    if (isMenuOpen) {
      // Line animation
      gsap.to(lineRef.current, {
        scaleX: 1,
        width: '100%',
        height: '100%',
        rotation: 45,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          // Overlay animation with blur effect
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
              backdropFilter: 'blur(8px)',
              duration: 0.8,
              ease: 'power2.out',
            }
          );

          // Menu slide-in with enhanced easing
          gsap.fromTo(
            menuRef.current,
            { x: '100%', opacity: 0 },
            {
              x: '0%',
              opacity: 1,
              duration: 0.9,
              ease: 'expo.out',
            }
          );

          // Menu items staggered entrance with bounce
          gsap.fromTo(
            menuItemsRef.current,
            { opacity: 0, y: 30, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.1,
              delay: 0.4,
              duration: 0.6,
              ease: 'back.out(1.7)',
              onComplete: () => setIsAnimating(false), // Animation complete
            }
          );
        },
      });
    } else {
      // Menu exit animation
      gsap.to(menuRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      });

      // Fade out menu items quickly before menu slides out
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: -15,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in',
      });

      // Overlay fade out
      gsap.to(overlayRef.current, {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.5,
        ease: 'power2.inOut',
      });

      // Line animation reverse
      gsap.to(lineRef.current, {
        scaleX: 0,
        width: '100%',
        height: '100%',
        rotation: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => setIsAnimating(false), // Animation complete
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
          onClick={toggleMenu} // Use the new toggle handler
          className="p-3 rounded-md bg-black bg-opacity-70 text-white hover:bg-opacity-90 transition-all duration-300"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          disabled={isAnimating} // Disable button during animation
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 backdrop-blur-0 transition-all pointer-events-none"
        style={{ display: isInitialized ? 'block' : 'none' }}
      />

      {/* Line */}
      <div
        ref={lineRef}
        className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-purple-500 to-pink-500 z-40 origin-top-left"
      />

      {/* Fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 h-screen w-screen bg-black bg-opacity-90 text-white flex flex-col items-center justify-center space-y-8"
        style={{ display: isInitialized ? 'flex' : 'none' }}
      >
        {['Home', 'Features', 'About', 'Contact'].map((item, index) => (
          <a
            key={item}
            ref={(el) => {
              menuItemsRef.current[index] = el;
            }}
            href="#"
            className="text-3xl font-light hover:text-purple-400 transition-colors duration-300 relative group"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
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
