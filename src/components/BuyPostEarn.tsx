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

  useEffect(() => {
    const lineCount = 8;
    const linesContainer = linesContainerRef.current;

    if (linesContainer) {
      for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className =
          'absolute bg-gradient-to-b from-purple-200 via-gray-700 to-purple-500 opacity-10 w-4';
        line.style.left = `${((i + 1) * 100) / (lineCount + 1)}%`;
        line.style.top = '0';
        line.style.bottom = '0';
        line.style.transform = 'translateY(-100%)';
        linesContainer.appendChild(line);

        gsap.to(line, {
          y: 0,
          duration: 1.5,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 1.5,
          },
        });

        gsap.to(line, {
          scaleY: 1.1,
          yoyo: true,
          repeat: -1,
          duration: 3,
          ease: 'sine.inOut',
        });
      }
    }

    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll('.section-panel');
      // Set up the horizontal scroll container
      gsap.set(sectionsContainerRef.current, {
        width: `${sections.length * 100}vw`,
        display: 'flex',
        flexDirection: 'row',
      });

      // Set each section to take up 100vw width
      gsap.set(sections, { width: '100vw' });

      // Create the horizontal scroll trigger with longer scroll and snapping
      ScrollTrigger.create({
        id: 'mainScroll',
        trigger: containerRef.current,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: () => `+=${sections.length * 900}vh`, // Much longer scroll distance
        scrub: 1, // Smoother scrub for better control
        anticipatePin: 1,
        animation: gsap.to(sectionsContainerRef.current, {
          x: () => -(sections.length - 1) * window.innerWidth,
          ease: 'none',
          duration: 3, // Increased for smoother animation
        }),
      });
    });

    return () => {
      ctx.revert();
      if (linesContainer) {
        linesContainer.innerHTML = '';
      }
    };
  }); // Added activeSection as dependency

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
            className="section-panel flex items-center h-screen relative w-screen"
            aria-labelledby={`${section.id}-heading`}
            tabIndex={0}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className={section.id === 'buy' ? 'order-2 md:order-1' : ''}>
                <span
                  className={`block text-sm font-medium text-${section.textColor} mb-2 animate-in uppercase tracking-widest`}
                >
                  {section.step}
                </span>
                <h2
                  id={`${section.id}-heading`}
                  className={`text-5xl md:text-6xl xl:text-7xl font-extrabold mb-6 section-title animate-in bg-clip-text text-transparent bg-gradient-to-r ${section.titleColor} tracking-tight`}
                >
                  {section.title}
                </h2>
                <p className="text-xl text-gray-300 mb-8 animate-in leading-relaxed">
                  {section.description}
                </p>
                <button
                  className={`cta-button bg-gradient-to-r ${section.buttonColor} text-white px-8 py-4 rounded-full text-lg font-medium transition-all animate-in transform hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-${section.ringColor} focus:ring-offset-2 focus:ring-offset-black group`}
                  aria-label={`Apply now and discover our partner brands`}
                >
                  <span className="flex items-center justify-center gap-2 transition-transform duration-300">
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
                <div className="relative animate-in w-full max-w-md">
                  <img
                    src={section.imageSrc}
                    alt={section.imageAlt}
                    className="rounded-2xl z-10 relative shadow-2xl hover:scale-105 transition-all duration-500 w-full h-auto object-cover aspect-[4/5]"
                  />
                  <div
                    className={`decorative-circle absolute ${
                      section.id === 'buy'
                        ? '-top-6 -left-6'
                        : section.id === 'post'
                        ? '-top-8 -right-8'
                        : '-bottom-8 -right-8'
                    } w-28 h-28 ${
                      section.circleClass
                    } rounded-full z-0 blur-sm`}
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
                    }`}
                    style={section.id === 'earn' ? { color: 'white' } : {}}
                  >
                    {section.tagContent}
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
