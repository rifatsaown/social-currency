import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Define the interface for the parallax event
interface ParallaxEvent extends MouseEvent {
  clientX: number;
  clientY: number;
}

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  // const logoRef = useRef<HTMLImageElement>(null); // Ref for the logo

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const blob1Element = blob1Ref.current;
    const blob2Element = blob2Ref.current;
    const imageElement = imageRef.current;
    // Animate the background gradient (faster)
    gsap.to('.bg-gradient-to-b', {
      backgroundPosition: '0 100%',
      duration: 1, // Even faster
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Initial setup: hide elements and set initial positions
    gsap.set(
      [
        headingRef.current,
        paragraphRef.current,
        buttonRef.current,
        imageRef.current,
      ],
      { opacity: 0, y: 15, scale: 0.98 } // Adjusted y and scale
    );

    gsap.set(
      [
        blob1Ref.current,
        blob2Ref.current,
        // logoRef.current
      ],
      {
        opacity: 0,
        scale: 0.05,
      }
    ); // Smaller initial scale

    // Animate elements in sequence (faster durations and offsets)
    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power4.out' }, // Faster fade-in
      '+=0'
    );

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power4.out' }, // Faster scale and movement
      '-=0.1'
    );

    tl.fromTo(
      paragraphRef.current,
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power4.out' },
      '-=0.15'
    );

    tl.fromTo(
      buttonRef.current,
      { opacity: 0, y: 15, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power4.out',
        delay: 0.02, // Reduced delay
      },
      '-=0.15'
    );

    tl.fromTo(
      imageRef.current,
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power4.out' }, // Slightly longer duration for the image
      '-=0.2'
    );
    // tl.fromTo(
    //   logoRef.current,
    //   { opacity: 0, scale: 0.05 },
    //   { opacity: 1, scale: 1, duration: 0.5, ease: 'power4.out' },
    //   '-=0.2'
    // );
    tl.fromTo(
      blob1Ref.current,
      { opacity: 0, scale: 0.05, x: '-=50', y: '-=50' }, // Adjusted initial position
      {
        opacity: 0.5,
        scale: 0.7,
        x: '0',
        y: '0',
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      },
      '-=0.4'
    );

    tl.fromTo(
      blob2Ref.current,
      { opacity: 0, scale: 0.05, x: '+=50', y: '+=50' }, // Adjusted initial position
      {
        opacity: 0.5,
        scale: 0.7,
        x: '0',
        y: '0',
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      },
      '-=0.4'
    );

    // Blob animations (continuous, very subtle movement)
    gsap.to(blob1Ref.current, {
      x: '+=7',
      y: '-=3',
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    gsap.to(blob2Ref.current, {
      x: '-=5',
      y: '+=7',
      duration: 3.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Subtle mouse parallax effect
    const parallax = (e: MouseEvent): void => {
      const speed = 0.03;
      const x = (window.innerWidth - (e as ParallaxEvent).clientX * 2) * speed;
      const y = (window.innerHeight - (e as ParallaxEvent).clientY * 2) * speed;

      gsap.to([blob1Ref.current, blob2Ref.current, imageRef.current], {
        x: x,
        y: y,
        duration: 0.2, // Smoother and Faster Transition
        ease: 'power2.out',
        overwrite: 'auto', // Important: this allows the animation to be interrupted smoothly
      });
    };

    window.addEventListener('mousemove', parallax);

    return () => {
      window.removeEventListener('mousemove', parallax);
      // Use stored references instead of the current ref values
      gsap.killTweensOf([blob1Element, blob2Element, imageElement]);
    };
  }, []);

  return (
    <div
      className="relative pt-20 pb-12 overflow-hidden min-h-screen"
      ref={heroRef}
    >
      {/* Darker Overlay for better text contrast */}
      <div className="absolute inset-0 z-0 bg-black/70"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/80 to-black"></div>
      </div>

      {/* Logo in the top right corner */}
      {/* <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center space-x-2">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5ZjFlZWMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ib3giPjxwYXRoIGQ9Ik0yMSA4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNloiLz48cGF0aCBkPSJtMy4zIDcgOC43IDUgOC43LTUiLz48cGF0aCBkPSJNMTIgMjJWMTIiLz48L3N2Zz4="
            alt="Company Logo"
            className="h-12 w-auto" // Adjust size as needed
            ref={logoRef}
          />
          <h2 className="font-bold text-2xl">INFLUZIO</h2>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1
              className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-5xl lg:mt-6 leading-tight"
              ref={headingRef}
            >
              <span className="block uppercase font-semibold">
                The UK’s 1st influence-powered
              </span>
              <span className="block uppercase">cashback platform</span>
            </h1>
            <p
              className="mt-3 text-lg text-gray-300 sm:mt-5 uppercase font-bold tracking-wider"
              ref={paragraphRef}
            >
              Fuelled by Likes & Shares
            </p>
            <div
              className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
              ref={buttonRef}
            >
              <Link
                to="/apply-now"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-bold rounded-full shadow-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all uppercase focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
              >
                Apply Now
              </Link>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center justify-center">
            <div
              className="relative mx-auto w-full max-w-md md:max-w-lg"
              ref={imageRef}
            >
              <img
                className="w-full rounded-xl shadow-lg object-cover object-center"
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="INFLUZIO Cards"
                style={{ maxHeight: '500px' }}
              />
              <div
                className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-50" // Reduced Opacity Further
                ref={blob1Ref}
              ></div>
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-50" // Reduced Opacity Further
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
