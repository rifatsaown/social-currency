import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const BuyPostEarn = () => {
  const buyRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLDivElement>(null);
  const earnRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linesContainerRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('buy');
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  useEffect(() => {
    const lineCount = 8;
    const linesContainer = linesContainerRef.current;

    if (linesContainer) {
      for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className =
          'absolute bg-gradient-to-b from-transparent via-gray-700 to-transparent opacity-10 w-px';
        line.style.left = `${((i + 1) * 100) / (lineCount + 1)}%`;
        line.style.top = '0';
        line.style.bottom = '0';
        line.style.transform = 'translateY(-100%)';
        linesContainer.appendChild(line);

        // Animate the lines using GSAP
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

        // Add a subtle, continuous animation to each line
        gsap.to(line, {
          scaleY: 1.1, // Slightly extend the line
          yoyo: true,
          repeat: -1,
          duration: 3,
          ease: 'sine.inOut',
        });
      }
    }

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => setIsComponentVisible(true),
        onLeave: () => setIsComponentVisible(false),
        onEnterBack: () => setIsComponentVisible(true),
        onLeaveBack: () => setIsComponentVisible(false),
      });

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

      const animateSection = (
        element: HTMLElement,
        color: string,
        direction: 'left' | 'right' | 'bottom'
      ) => {
        const sectionName = element.id.split('-')[0];
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100', // Adjust start position
            end: 'bottom top+=100', // Adjust end position
            scrub: 1.5, // Add scrub for smoother animation
            onEnter: () => setActiveSection(sectionName),
            onEnterBack: () => setActiveSection(sectionName),
            invalidateOnRefresh: true, //Important for responsiveness
          },
        });

        tl.to(element, {
          backgroundColor: color,
          borderRadius: '1.5rem',
          boxShadow: `0 20px 30px -15px ${color.replace('0.1', '0.2')}`,
          duration: 0.8,
          ease: 'power2.inOut',
        });

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

        const decorativeCircle = element.querySelector('.decorative-circle');
        if (decorativeCircle) {
          tl.fromTo(
            decorativeCircle,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
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
            { x: xValue, y: yValue, opacity: 0, scale: 0.8 },
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

        const image = element.querySelector('img');
        if (image) {
          // Parallax effect
          gsap.to(image, {
            yPercent: -15, // Adjust for desired parallax intensity
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });

          //Original Image animation
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

      [
        {
          ref: buyRef,
          color: 'rgba(91, 33, 182, 0.1)',
          direction: 'right' as const,
        },
        {
          ref: postRef,
          color: 'rgba(16, 185, 129, 0.1)',
          direction: 'left' as const,
        },
        {
          ref: earnRef,
          color: 'rgba(168, 85, 247, 0.1)',
          direction: 'bottom' as const,
        },
      ].forEach(({ ref, color, direction }) => {
        if (ref.current) {
          animateSection(ref.current, color, direction);
        }
      });

      document.querySelectorAll('.cta-button').forEach((button) => {
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
            { x: 5, duration: 0.2, ease: 'power1.out' },
            0
          );

        ['mouseenter', 'mouseleave', 'focus', 'blur'].forEach((event) => {
          button.addEventListener(event, () => {
            btnTl[
              event === 'mouseenter' || event === 'focus' ? 'play' : 'reverse'
            ]();
          });
        });
      });

      // Navigation button hover effects
      navigationRef.current?.querySelectorAll('button').forEach((button) => {
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(button, {
          scale: 1.3,
          duration: 0.2,
          ease: 'power2.out',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        });

        ['mouseenter', 'mouseleave', 'focus', 'blur'].forEach((event) => {
          button.addEventListener(event, () => {
            hoverTl[
              event === 'mouseenter' || event === 'focus' ? 'play' : 'reverse'
            ]();
          });
        });
      });
    });

    return () => {
      ctx.revert();
      if (linesContainer) {
        linesContainer.innerHTML = '';
      }
    };
  }, []);

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: `#${section}-section`, offsetY: 80 },
      ease: 'power3.inOut',
    });
  };

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
      className="py-24 bg-black overflow-hidden relative"
      ref={containerRef}
      aria-labelledby="buy-post-earn-title"
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        ref={linesContainerRef}
        aria-hidden="true"
      ></div>

      <div className="sr-only">
        {sectionData.map((section) => (
          <a key={section.id} href={`#${section.id}-section`}>
            Skip to {section.title} section
          </a>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 id="buy-post-earn-title" className="sr-only">
          How It Works
        </h2>

        <div
          ref={navigationRef}
          className={`fixed right-10 top-1/2 transform -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4 transition-opacity duration-500 ${
            isComponentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {sectionData.map((section) => (
            <button
              key={section.id}
              onClick={() => handleButtonClick(section.id)}
              className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Navigate to ${section.title} section`}
              aria-current={activeSection === section.id ? 'true' : 'false'}
            ></button>
          ))}
        </div>

        {sectionData.map((section) => (
          <div
            key={section.id}
            ref={section.ref}
            id={`${section.id}-section`}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center mb-32 p-8 lg:p-12 transition-all duration-300 rounded-xl"
            aria-labelledby={`${section.id}-heading`}
            tabIndex={0}
          >
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
                onClick={() =>
                  handleButtonClick(
                    sectionData[
                      (sectionData.indexOf(section) + 1) % sectionData.length
                    ].id
                  )
                }
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
                  } w-28 h-28 ${section.circleClass} rounded-full z-0 blur-sm`}
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
        ))}
      </div>
    </div>
  );
};

export default BuyPostEarn;