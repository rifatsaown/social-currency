import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });

    // Animate the background gradient
    gsap.to('.bg-gradient-to-b', {
      backgroundPosition: '0 100%',
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Initial setup: hide elements
    gsap.set(
      [
        headingRef.current,
        paragraphRef.current,
        buttonRef.current,
        imageRef.current,
        blob1Ref.current,
        blob2Ref.current,
      ],
      { opacity: 0, y: 50 }
    );

    // Animate elements in sequence
    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '+=0.2'
    );
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0 },
      '-=0.2'
    );
    tl.fromTo(
      paragraphRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0 },
      '-=0.2'
    );
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0 },
      '-=0.2'
    );
    tl.fromTo(
      imageRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0 },
      '-=0.2'
    );
    tl.fromTo(
      blob1Ref.current,
      { opacity: 0, scale: 0, x: '-=50', y: '-=50' },
      { opacity: 0.7, scale: 1, x: '0', y: '0', duration: 0.7 },
      '-=0.5'
    );
    tl.fromTo(
      blob2Ref.current,
      { opacity: 0, scale: 0, x: '+=50', y: '+=50' },
      { opacity: 0.7, scale: 1, x: '0', y: '0', duration: 0.7 },
      '-=0.5'
    );

    // Blob animations (moved outside the main timeline for continuous animation)
    gsap.to(blob1Ref.current, {
      x: '+=20',
      y: '-=10',
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    gsap.to(blob2Ref.current, {
      x: '-=15',
      y: '+=20',
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <div className="relative pt-24 pb-16 overflow-hidden" ref={heroRef}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/70 to-black"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1
              className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-5xl lg:mt-6 xl:text-6xl"
              ref={headingRef}
            >
              <span className="block uppercase">THE WORLD'S 1ST SOCIAL</span>
              <span className="block uppercase">CURRENCY CARD</span>
            </h1>
            <p
              className="mt-3 text-xl text-gray-300 sm:mt-5 uppercase font-bold tracking-wider"
              ref={paragraphRef}
            >
              FUELLED BY LIKES & SHARE
            </p>
            <div
              className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
              ref={buttonRef}
            >
              <button className="inline-flex items-center px-8 py-4 border border-transparent text-base font-bold rounded-full shadow-sm text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all uppercase">
                Apply Now
              </button>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full" ref={imageRef}>
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="WYLD Cards"
              />
              <div
                className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
                ref={blob1Ref}
              ></div>
              <div
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
                ref={blob2Ref}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
