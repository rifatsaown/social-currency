import gsap from 'gsap';
import {
  PercentCircle,
  ShoppingBag,
  Sparkles,
  Tag,
  Users,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WhyInfluzio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const highlightTextRefs = useRef<HTMLSpanElement[]>([]);
  const bgBlobRef = useRef<HTMLDivElement>(null);
  const bgBlob2Ref = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    highlightTextRefs.current = [];

    // Auto-advance steps every 3 seconds
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 3000);

    const initAnimations = () => {
      gsap.set(
        [
          headingRef.current,
          subHeadingRef.current,
          contentRef.current,
          stepsRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      gsap.set([bgBlobRef.current, bgBlob2Ref.current], {
        scale: 0.5,
        opacity: 0,
      });

      // Floating animation for blobs
      gsap.to(bgBlobRef.current, {
        x: '20px',
        y: '-30px',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(bgBlob2Ref.current, {
        x: '-15px',
        y: '25px',
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Animate elements sequentially
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            toggleActions: 'play none none reverse',
          },
        })
        .to([bgBlobRef.current, bgBlob2Ref.current], {
          scale: 1,
          opacity: 0.5,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power2.out',
        })
        .to(
          headingRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.8'
        )
        .to(
          subHeadingRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .to(
          contentRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )
        .to(
          stepsRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );

      // Animate highlight texts
      highlightTextRefs.current.forEach((element) => {
        gsap.to(element, {
          backgroundSize: '100% 100%',
          color: '#fff',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
    };

    setTimeout(() => {
      initAnimations();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const addToHighlightRefs = (el: HTMLSpanElement | null) => {
    if (el && !highlightTextRefs.current.includes(el)) {
      highlightTextRefs.current.push(el);
    }
  };

  const navigate = useNavigate();

  // Function to handle the "Get Started" button click will redirect to the /apply-now page
  const handleGetStartedClick = () => {
    console.log('Get Started button clicked!');
    navigate('/apply-now');
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
      {/* Background blobs */}
      <div
        ref={bgBlobRef}
        className="absolute -right-64 top-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl opacity-30"
      ></div>
      <div
        ref={bgBlob2Ref}
        className="absolute -left-64 bottom-20 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl opacity-30"
      ></div>

      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTQuNWExIDEgMCAwIDAtMS0xaC00YTEgMSAwIDAgMC0xIDF2NC41aDJ2LTMuNWgydjMuNWgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:text-center">
          <h2
            ref={headingRef}
            className="text-base text-purple-400 font-semibold tracking-wide uppercase flex items-center justify-center gap-2 before:content-[''] before:h-px before:w-8 before:bg-purple-400 after:content-[''] after:h-px after:w-8 after:bg-purple-400"
          >
            <Sparkles className="w-4 h-4 text-purple-400 inline mr-1" /> Why
            Influzio?{' '}
            <Sparkles className="w-4 h-4 text-purple-400 inline ml-1" />
          </h2>
          <p
            ref={subHeadingRef}
            className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white"
          >
            Influence is for everyone!
          </p>
        </div>

        <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-12">
          <div ref={contentRef} className="lg:col-span-7">
            <div className="p-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
              <div className="bg-black rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-purple-400" />
                  <p className="text-xl text-gray-100 font-medium">
                    <span
                      ref={addToHighlightRefs}
                      className="font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-no-repeat bg-[length:0%_2px] bg-[position:0_88%]"
                    >
                      Creator? A regular Instagrammer?
                    </span>{' '}
                    <br className="hidden sm:block" />
                    You just need{' '}
                    <span className="text-pink-400 font-bold">
                      500 followers
                    </span>{' '}
                    to start earning.
                  </p>
                </div>

                <div className="flex items-start gap-3 mt-8">
                  <Zap className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                  <p className="text-xl text-gray-100">
                    Influzio helps you turn your influence into cashback —{' '}
                    <span
                      ref={addToHighlightRefs}
                      className="font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-no-repeat bg-[length:0%_2px] bg-[position:0_88%]"
                    >
                      real rewards, real impact.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div ref={stepsRef} className="mt-12">
              <p className="text-lg font-medium text-white mb-6">
                How it works:
              </p>
              <div className="grid gap-3">
                {[
                  {
                    icon: ShoppingBag,
                    text: 'Shop from your favorite brands',
                    detail:
                      'Browse thousands of partner stores and make your usual purchases',
                  },
                  {
                    icon: Tag,
                    text: 'Tag them in your post',
                    detail:
                      'Create authentic content featuring your purchase with brand tags',
                  },
                  {
                    icon: PercentCircle,
                    text: 'Earn up to 60% cashback',
                    detail:
                      'The more engagement your post gets, the higher your rewards',
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`relative transition-all duration-300 cursor-pointer ${
                      activeStep === index
                        ? 'bg-gradient-to-r from-purple-900/60 to-blue-900/60 scale-[1.02]'
                        : 'bg-blue-950/30 hover:bg-blue-950/40'
                    } backdrop-blur-sm p-6 rounded-lg border ${
                      activeStep === index
                        ? 'border-purple-500/50'
                        : 'border-blue-900/30'
                    }`}
                  >
                    {activeStep === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg animate-pulse"></div>
                    )}
                    <div className="flex items-center space-x-4 relative z-10">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${
                          activeStep === index
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                            : 'bg-blue-900/50'
                        }`}
                      >
                        <step.icon
                          className={`h-6 w-6 ${
                            activeStep === index
                              ? 'text-white'
                              : 'text-purple-400'
                          }`}
                        />
                      </div>
                      <div>
                        <span className="text-lg font-medium text-white">
                          {step.text}
                          {index === 2 && (
                            <span className="ml-1 text-pink-400 font-bold">
                              60%
                            </span>
                          )}
                        </span>
                        <p className="text-gray-400 mt-1">{step.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-5">
            <div className="bg-gradient-to-br from-blue-950/60 via-purple-900/40 to-pink-900/30 backdrop-blur-lg p-8 rounded-xl border border-purple-900/50 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-pink-500/20 rounded-full blur-xl"></div>

              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
                The Influzio Revolution
              </h3>

              <div className="space-y-8">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    ?
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">
                      Is this new?{' '}
                      <span className="text-purple-400 block sm:inline">
                        Absolutely.
                      </span>
                    </p>
                    <p className="text-gray-400 mt-1">
                      We're pioneering social media monetization
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    !
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">
                      Is it exciting?{' '}
                      <span className="text-purple-400 block sm:inline">
                        100%.
                      </span>
                    </p>
                    <p className="text-gray-400 mt-1">
                      Transforming how we think about influence
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">
                      Feels too good to be true?{' '}
                      <span className="text-pink-400 block sm:inline">
                        Welcome to Influzio.
                      </span>
                    </p>
                    <p className="text-gray-400 mt-1">
                      Join thousands already earning rewards
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGetStartedClick}
                className="mt-10 w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full transition-all hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black transform hover:scale-[1.02]"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyInfluzio;
