import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

// Register the plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const BuyPostEarn = () => {
  const buyRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLDivElement>(null);
  const earnRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linesContainerRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('buy');
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(false);

  useEffect(() => {
    const lineCount = 8;
    const linesContainer = linesContainerRef.current;

    if (linesContainer) {
      // Create animated background lines
      for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className =
          'absolute bg-gradient-to-b from-transparent via-gray-700 to-transparent opacity-10 w-px';
        line.style.left = `${((i + 1) * 100) / (lineCount + 1)}%`;
        line.style.top = '0';
        line.style.bottom = '0';
        line.style.transform = 'translateY(-100%)';
        linesContainer.appendChild(line);
      }

      // Animate lines on scroll
      const lines = linesContainer.querySelectorAll('div');
      lines.forEach((line, index) => {
        gsap.to(line, {
          y: 0,
          duration: 1.5,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 1.5,
          },
        });
      });
    }

    // Setup animations when component mounts
    const ctx = gsap.context(() => {
      // Main container animation
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Create ScrollTrigger to track component visibility
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => setIsComponentVisible(true),
        onLeave: () => setIsComponentVisible(false),
        onEnterBack: () => setIsComponentVisible(true),
        onLeaveBack: () => setIsComponentVisible(false),
      });

      // Animate navigation dots when component is visible
      if (navigationRef.current) {
        gsap.fromTo(
          navigationRef.current,
          { opacity: 0, scale: 0.8, x: 20 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animation for section titles with smoother effect
      gsap.fromTo(
        '.section-title',
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.section-title',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Store elements for cleanup
      const buyElement = buyRef.current;
      const postElement = postRef.current;
      const earnElement = earnRef.current;

      // Create a reusable animation function for sections
      const animateSection = (
        element: HTMLElement,
        color: string,
        direction: 'left' | 'right' | 'bottom'
      ) => {
        // Set active section for accessibility
        const sectionId = element.id;
        const sectionName = sectionId.split('-')[0];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100',
            end: 'bottom top+=100',
            onEnter: () => setActiveSection(sectionName),
            onEnterBack: () => setActiveSection(sectionName),
          },
        });

        // Subtle gradient background animation with reduced opacity
        tl.to(element, {
          backgroundColor: color,
          borderRadius: '1.5rem',
          boxShadow: `0 20px 30px -15px ${color.replace('0.1', '0.2')}`,
          duration: 0.8,
          ease: 'power2.inOut',
        });

        // Animate content elements with staggered timing
        const animateInElements = element.querySelectorAll('.animate-in');
        if (animateInElements.length > 0) {
          tl.fromTo(
            animateInElements,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.65,
              ease: 'power2.out',
            },
            '-=0.5'
          );
        }

        // Animated decorative elements with more dynamic entrances
        const decorativeCircle = element.querySelector('.decorative-circle');
        if (decorativeCircle) {
          tl.fromTo(
            decorativeCircle,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'back.out(1.7)',
            },
            '-=0.6'
          );
        }

        const decorativeTag = element.querySelector('.decorative-tag');
        if (decorativeTag) {
          const xValue =
            direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
          const yValue = direction === 'bottom' ? 100 : 0;

          tl.fromTo(
            decorativeTag,
            {
              x: xValue,
              y: yValue,
              opacity: 0,
              scale: 0.8,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
            },
            '-=0.7'
          );
        }

        // Subtle pulse animation for the images
        const image = element.querySelector('img');
        if (image) {
          gsap.to(image, {
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
            y: -5,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
          });
        }

        return tl;
      };

      if (buyElement) {
        animateSection(buyElement, 'rgba(91, 33, 182, 0.1)', 'right');
      }

      if (postElement) {
        animateSection(postElement, 'rgba(16, 185, 129, 0.1)', 'left');
      }

      if (earnElement) {
        animateSection(earnElement, 'rgba(168, 85, 247, 0.1)', 'bottom');
      }

      // Enhanced button hover animations
      const buttons = document.querySelectorAll('.cta-button');
      buttons.forEach((button) => {
        // Create button hover animation
        const btnTl = gsap.timeline({ paused: true });
        btnTl
          .to(button, {
            scale: 1.05,
            duration: 0.25,
            ease: 'power1.out',
            background: 'linear-gradient(to right, #9333ea, #ec4899)',
            boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.5)',
          })
          .to(
            button.querySelector('span') || button,
            {
              x: 5,
              duration: 0.2,
              ease: 'power1.out',
            },
            0
          );

        // Attach event listeners
        button.addEventListener('mouseenter', () => btnTl.play());
        button.addEventListener('mouseleave', () => btnTl.reverse());
        button.addEventListener('focus', () => btnTl.play());
        button.addEventListener('blur', () => btnTl.reverse());
      });
    });

    // Cleanup
    return () => {
      ctx.revert();
      if (linesContainer) {
        while (linesContainer.firstChild) {
          linesContainer.removeChild(linesContainer.firstChild);
        }
      }
    };
  }, []);

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
    gsap.to(window, {
      duration: 0.8,
      scrollTo: {
        y: `#${section}-section`,
        offsetY: 80,
      },
      ease: 'power3.inOut',
    });
  };

  return (
    <div
      className="py-24 bg-black overflow-hidden relative"
      ref={containerRef}
      aria-labelledby="buy-post-earn-title"
    >
      {/* Animated background lines container */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        ref={linesContainerRef}
        aria-hidden="true"
      ></div>

      {/* Skip to section navigation for accessibility */}
      <div className="sr-only">
        <a href="#buy-section">Skip to Buy section</a>
        <a href="#post-section">Skip to Post section</a>
        <a href="#earn-section">Skip to Earn section</a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 id="buy-post-earn-title" className="sr-only">
          How It Works
        </h2>

        {/* Navigation dots (visible only when component is in viewport) */}
        <div
          ref={navigationRef}
          className={`fixed right-10 top-1/2 transform -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4 transition-opacity duration-500 ${
            isComponentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {['buy', 'post', 'earn'].map((section) => (
            <button
              key={section}
              onClick={() => handleButtonClick(section)}
              className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${
                activeSection === section
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Navigate to ${section} section`}
              aria-current={activeSection === section ? 'true' : 'false'}
            ></button>
          ))}
        </div>

        {/* BUY Section */}
        <div
          ref={buyRef}
          id="buy-section"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center mb-32 p-8 lg:p-12 transition-all duration-300 rounded-xl"
          aria-labelledby="buy-heading"
          tabIndex={0}
        >
          <div className="order-2 md:order-1">
            <span className="block text-sm font-medium text-purple-400 mb-2 animate-in uppercase tracking-widest">
              STEP 1
            </span>
            <h2
              id="buy-heading"
              className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-white mb-6 section-title animate-in bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-400 tracking-tight"
            >
              BUY
            </h2>
            <p className="text-xl text-gray-300 mb-8 animate-in leading-relaxed">
              Shop your heart out at our loved partner brands and enjoy
              exclusive deals designed just for our cardholders.
            </p>
            <button
              className="cta-button bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-medium transition-all animate-in transform hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black group"
              onClick={() => handleButtonClick('post')}
              aria-label="Apply now and discover our partner brands"
            >
              <span className="flex items-center justify-center gap-2 transition-transform duration-300">
                APPLY NOW
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="transform group-hover:translate-x-1 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative animate-in w-full max-w-md">
              <img
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2215&q=80"
                alt="Woman shopping with social currency card"
                className="rounded-2xl z-10 relative shadow-2xl hover:scale-105 transition-all duration-500 w-full h-auto object-cover aspect-[4/5]"
              />
              <div className="decorative-circle absolute -top-6 -left-6 w-28 h-28 bg-gradient-to-tr from-yellow-400 to-orange-300 rounded-full z-0 blur-sm"></div>
              <div className="decorative-tag absolute bottom-12 -right-10 w-36 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl z-0 flex items-center justify-center transform rotate-3 shadow-lg">
                <span className="text-white text-3xl font-bold">₹</span>
              </div>
            </div>
          </div>
        </div>

        {/* POST Section */}
        <div
          ref={postRef}
          id="post-section"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center mb-32 p-8 lg:p-12 transition-all duration-300 rounded-xl"
          aria-labelledby="post-heading"
          tabIndex={0}
        >
          <div className="flex justify-center">
            <div className="relative animate-in w-full max-w-md">
              <img
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Man posting on social media with smartphone"
                className="rounded-2xl z-10 relative shadow-2xl hover:scale-105 transition-all duration-500 w-full h-auto object-cover aspect-[4/5]"
              />
              <div className="decorative-circle absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-bl from-green-400 to-teal-500 rounded-full z-0 blur-sm"></div>
              <div className="decorative-tag absolute -bottom-6 -left-10 w-36 h-20 bg-white rounded-xl z-0 flex items-center justify-center transform -rotate-3 shadow-lg">
                <span className="text-gray-900 text-xl font-bold flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  TAG
                </span>
              </div>
            </div>
          </div>
          <div>
            <span className="block text-sm font-medium text-teal-400 mb-2 animate-in uppercase tracking-widest">
              STEP 2
            </span>
            <h2
              id="post-heading"
              className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-white mb-6 section-title animate-in bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500 tracking-tight"
            >
              POST
            </h2>
            <p className="text-xl text-gray-300 mb-8 animate-in leading-relaxed">
              Share your shopping experience and tag the brand on social media.
              Show off your style while building your influence.
            </p>
            <button
              className="cta-button bg-gradient-to-r from-green-400 to-teal-500 text-white px-8 py-4 rounded-full text-lg font-medium transition-all animate-in transform hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-black group"
              onClick={() => handleButtonClick('earn')}
              aria-label="Apply now and boost your social media presence"
            >
              <span className="flex items-center justify-center gap-2 transition-transform duration-300">
                APPLY NOW
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="transform group-hover:translate-x-1 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* EARN Section */}
        <div
          ref={earnRef}
          id="earn-section"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center p-8 lg:p-12 transition-all duration-300 rounded-xl"
          aria-labelledby="earn-heading"
          tabIndex={0}
        >
          <div className="order-2 md:order-1">
            <span className="block text-sm font-medium text-pink-400 mb-2 animate-in uppercase tracking-widest">
              STEP 3
            </span>
            <h2
              id="earn-heading"
              className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-white mb-6 section-title animate-in bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 tracking-tight"
            >
              EARN
            </h2>
            <p className="text-xl text-gray-300 mb-8 animate-in leading-relaxed">
              Get cashback and rewards based on your social engagement. The more
              your posts perform, the more you earn.
            </p>
            <button
              className="cta-button bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-medium transition-all animate-in transform hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black group"
              onClick={() => handleButtonClick('buy')}
              aria-label="Apply now and start earning rewards"
            >
              <span className="flex items-center justify-center gap-2 transition-transform duration-300">
                APPLY NOW
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="transform group-hover:translate-x-1 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative animate-in w-full max-w-md">
              <img
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Person receiving rewards on smartphone"
                className="rounded-2xl z-10 relative shadow-2xl hover:scale-105 transition-all duration-500 w-full h-auto object-cover aspect-[4/5]"
              />
              <div className="decorative-circle absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-bl from-purple-600 to-pink-500 rounded-full z-0 blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPostEarn;
