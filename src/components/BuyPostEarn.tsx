import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const BuyPostEarn = () => {
  const buyRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLDivElement>(null);
  const earnRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const linesContainerRef = useRef<HTMLDivElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);

  // Create a more optimized animation setup
  useEffect(() => {
    // Create floating particles for futuristic background effect
    const createBackgroundParticles = () => {
      const particlesContainer = particlesContainerRef.current;
      if (!particlesContainer) return;

      particlesContainer.innerHTML = '';
      const particleCount = 125; // Reduced count for performance
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2; // 2-8px sized particles
        const isCircle = Math.random() > 0.5;

        particle.className = `absolute ${
          isCircle ? 'rounded-full' : 'rounded-sm'
        } opacity-20`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Assign different colors
        const colors = [
          'bg-purple-400',
          'bg-pink-400',
          'bg-teal-400',
          'bg-indigo-400',
          'bg-blue-400',
        ];
        particle.classList.add(
          colors[Math.floor(Math.random() * colors.length)]
        );

        fragment.appendChild(particle);
      }

      particlesContainer.appendChild(fragment);

      // Animate particles with batch method for performance
      const particles = particlesContainer.querySelectorAll('div');
      particles.forEach((particle) => {
        // Random starting position for staggered effect
        gsap.set(particle, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          opacity: gsap.utils.random(0.1, 0.4),
        });

        // Create floating animation
        gsap.to(particle, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          rotation: gsap.utils.random(-180, 180),
          duration: gsap.utils.random(15, 30),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // Pulse opacity for extra dimension
        gsap.to(particle, {
          opacity: gsap.utils.random(0.05, 0.2),
          duration: gsap.utils.random(2, 5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    };

    // Set up the horizontal scroll and section transitions
    const setupScrollTrigger = () => {
      const sections = document.querySelectorAll('.section-panel');
    
      // Clean previous instances to prevent memory leaks
      ScrollTrigger.getAll().forEach((st) => st.kill());
    
      // Set up the horizontal scroll container
      if (sectionsContainerRef.current) {
        gsap.set(sectionsContainerRef.current, {
          width: `${sections.length * 100}vw`,
          display: 'flex',
          flexDirection: 'row',
        });
      }
    
      // Set each section to take up 100vw width
      gsap.set(sections, { width: '100vw' });
    
      // Main scroll animation with smooth behavior
      const scrubValue = window.innerWidth > 768 ? 0.8 : 1.2; // Responsive scrub value
    
      // Create the horizontal scroll trigger with smooth snapping
      ScrollTrigger.create({
        id: 'mainScroll',
        trigger: containerRef.current,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: () => `+=${sections.length * 700}vw`, // Adjusted for smoothness
        scrub: scrubValue,
        anticipatePin: 1,
        animation: gsap.to(sectionsContainerRef.current, {
          x: () => `-${(sections.length - 1) * 100}vw`, // Adjusted for smoothness
          ease: 'power3.inOut', // Smoother easing function
          duration: sections.length * 2, // Adjusted duration for smoothness
        }),
        snap: {
          snapTo: 1 / (sections.length - 1), // Smooth snapping between sections
          duration: { min: 0.2, max: 0.8 }, // Snapping duration
          ease: 'power3.inOut', // Smooth snapping easing
        },
      });
    
      // Set up section-specific animations
      sections.forEach((section, index) => {
        const elements = section.querySelectorAll('.animate-in');
        const image = section.querySelector('img');
        const decorCircle = section.querySelector('.decorative-circle');
        const decorTag = section.querySelector('.decorative-tag');
    
        // Create a timeline for each section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            containerAnimation: ScrollTrigger.getById('mainScroll')?.animation,
            start: 'left center',
            end: 'right center',
            scrub: 0.5,
          },
        });
    
        // Staggered text animations
        tl.fromTo(
          elements,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
          },
          0
        );
    
        // Image and decorative elements animations
        if (image) {
          tl.fromTo(
            image,
            {
              scale: 0.8,
              opacity: 0,
              rotateY: index % 2 === 0 ? 15 : -15,
            },
            {
              scale: 1,
              opacity: 1,
              rotateY: 0,
              duration: 1.2,
              ease: 'back.out(1.5)',
            },
            0.2
          );
        }
    
        if (decorCircle) {
          tl.fromTo(
            decorCircle,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: 'elastic.out(1, 0.5)',
            },
            0.4
          );
        }
    
        if (decorTag) {
          tl.fromTo(
            decorTag,
            {
              x: index % 2 === 0 ? 50 : -50,
              opacity: 0,
              rotation: index % 2 === 0 ? 10 : -10,
            },
            {
              x: 0,
              opacity: 1,
              rotation: index === 0 ? 3 : index === 1 ? -3 : 2,
              duration: 1,
              ease: 'power2.out',
            },
            0.6
          );
        }
      });
    };
    // Initialize all animations
    createBackgroundParticles();
    setupScrollTrigger();

    // Add resize handler for responsive behavior
    const handleResize = () => {
      ScrollTrigger.refresh(true);
      setupScrollTrigger();
    };

    window.addEventListener('resize', handleResize);

    // Watch for active section changes
    const activeWatcher = gsap.effects?.highlightActiveSection?.create();

    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (linesContainerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        linesContainerRef.current.innerHTML = '';
      }
      if (particlesContainerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        particlesContainerRef.current.innerHTML = '';
      }
      if (activeWatcher) activeWatcher.kill();
    };
  }, []); // Added activeSection as dependency for section highlighting

  const sectionData = [
    {
      id: 'buy',
      step: 'STEP 1',
      title: 'BUY',
      description:
        'Shop your heart out at our loved partner brands and enjoy exclusive deals designed just for our cardholders.',
      buttonText: 'APPLY NOW',
      imageSrc:
        'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2215&q=80',
      imageAlt: 'Woman shopping with social currency card',
      circleClass: 'bg-gradient-to-tr from-yellow-400 to-orange-300',
      tagContent: '$',
      ref: buyRef,
      textColor: 'purple-400',
      titleColor: 'from-purple-500 to-indigo-400',
      buttonColor: 'from-purple-500 to-pink-500',
      ringColor: 'purple-500',
    },
    {
      id: 'post',
      step: 'STEP 2',
      title: 'POST',
      description:
        'Share your shopping experience and tag the brand on social media. Show off your style while building your influence.',
      buttonText: 'APPLY NOW',
      imageSrc:
        'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      imageAlt: 'Man posting on social media with smartphone',
      circleClass: 'bg-gradient-to-bl from-green-400 to-teal-500',
      tagContent: (
        <>
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
        </>
      ),
      ref: postRef,
      textColor: 'teal-400',
      titleColor: 'from-green-400 to-teal-500',
      buttonColor: 'from-green-400 to-teal-500',
      ringColor: 'teal-500',
    },
    {
      id: 'earn',
      step: 'STEP 3',
      title: 'EARN',
      description:
        'Get cashback and rewards based on your social engagement. The more your posts perform, the more you earn.',
      buttonText: 'APPLY NOW',
      imageSrc:
        'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      imageAlt: 'Person receiving rewards on smartphone',
      circleClass: 'bg-gradient-to-bl from-purple-600 to-pink-500',
      tagContent: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          REWARDS
        </>
      ),
      ref: earnRef,
      textColor: 'pink-400',
      titleColor: 'from-pink-500 to-purple-500',
      buttonColor: 'from-pink-500 to-purple-500',
      ringColor: 'pink-500',
    },
  ];

  return (
    <div
      className="relative bg-black overflow-hidden h-screen"
      ref={containerRef}
      aria-labelledby="buy-post-earn-title"
    >
      {/* Layered background elements for depth */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80 z-0"
        aria-hidden="true"
      ></div>

      {/* Animated background particles */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        ref={particlesContainerRef}
        aria-hidden="true"
      ></div>

      {/* Animated background lines */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        ref={linesContainerRef}
        aria-hidden="true"
      ></div>

      {/* Horizontal scrolling container */}
      <div ref={sectionsContainerRef} className="absolute inset-0">
        {sectionData.map((section) => (
          <div
            key={section.id}
            ref={section.ref}
            id={`${section.id}-section`}
            className="section-panel flex items-center h-screen relative w-screen will-change-transform"
            aria-labelledby={`${section.id}-heading`}
            tabIndex={0}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className={section.id === 'buy' ? 'order-2 md:order-1' : ''}>
                <span
                  className={`block text-sm font-medium text-${section.textColor} mb-2 animate-in uppercase tracking-widest will-change-transform`}
                >
                  {section.step}
                </span>
                <h2
                  id={`${section.id}-heading`}
                  className={`text-5xl md:text-6xl xl:text-7xl font-extrabold mb-6 section-title animate-in bg-clip-text text-transparent bg-gradient-to-r ${section.titleColor} tracking-tight will-change-transform`}
                >
                  {section.title}
                </h2>
                <p className="text-xl text-gray-300 mb-8 animate-in leading-relaxed will-change-transform">
                  {section.description}
                </p>
                <button
                  className={`cta-button bg-gradient-to-r ${section.buttonColor} text-white px-8 py-4 rounded-full text-lg font-medium transition-all animate-in transform hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-${section.ringColor} focus:ring-offset-2 focus:ring-offset-black group will-change-transform overflow-hidden relative`}
                  aria-label={`Apply now and discover our partner brands`}
                >
                  {/* Button glow effect */}
                  <span className="absolute inset-0 opacity-30 bg-white blur-xl transform scale-150 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></span>

                  <span className="flex items-center justify-center gap-2 transition-transform duration-300 relative z-10">
                    {section.buttonText}
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
              <div
                className={
                  section.id === 'buy'
                    ? 'order-1 md:order-2 flex justify-center'
                    : 'flex justify-center'
                }
              >
                <div className="relative animate-in w-full max-w-md perspective-1000">
                  {/* Subtle glow behind image */}
                  <div
                    className={`absolute inset-0 ${section.circleClass} opacity-20 blur-2xl rounded-full transform scale-150 z-0`}
                    aria-hidden="true"
                  ></div>

                  {/* Hover effect wrapper */}
                  <div className="relative group">
                    <img
                      src={section.imageSrc}
                      alt={section.imageAlt}
                      className="rounded-2xl z-10 relative shadow-2xl hover:scale-105 transition-all duration-500 w-full h-auto object-cover aspect-[4/5] will-change-transform"
                    />

                    {/* Image hover shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white to-transparent blur-sm mix-blend-overlay transition-opacity duration-1000 rounded-2xl z-20"></div>
                  </div>

                  <div
                    className={`decorative-circle absolute ${
                      section.id === 'buy'
                        ? '-top-6 -left-6'
                        : section.id === 'post'
                        ? '-top-8 -right-8'
                        : '-bottom-8 -right-8'
                    } w-28 h-28 ${
                      section.circleClass
                    } rounded-full z-0 blur-sm will-change-transform`}
                  ></div>
                  <div
                    className={`decorative-tag absolute ${
                      section.id === 'buy'
                        ? 'bottom-12 -right-10 bg-gradient-to-r from-green-300 to-green-500'
                        : section.id === 'post'
                        ? '-bottom-6 -left-10'
                        : 'top-10 -left-10'
                    } w-36 h-20 bg-white rounded-xl flex items-center justify-center transform ${
                      section.id === 'post'
                        ? '-rotate-3 text-black'
                        : section.id === 'earn'
                        ? 'rotate-2'
                        : 'rotate-3'
                    } shadow-lg z-[10] ${
                      section.id === 'earn'
                        ? 'bg-gradient-to-r from-pink-400 to-purple-500'
                        : ''
                    } will-change-transform backdrop-blur-sm`}
                    style={section.id === 'earn' ? { color: 'white' } : {}}
                  >
                    <div className="flex items-center justify-center font-bold text-lg">
                      {section.tagContent}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyPostEarn;
