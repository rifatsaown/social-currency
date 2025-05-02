import {
  PercentCircle,
  ShoppingBag,
  Sparkles,
  Tag,
  Users,
  Zap,
} from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Memoized components for better performance
const StepItem = memo(
  ({
    icon: Icon,
    text,
    detail,
    isActive,
    index,
    onClick,
  }: {
    icon: React.ElementType;
    text: string;
    detail: string;
    isActive: boolean;
    index: number;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className={`relative transition-all duration-300 cursor-pointer ${
        isActive
          ? 'bg-gradient-to-r from-purple-900/60 to-blue-900/60 scale-[1.02]'
          : 'bg-blue-950/30 hover:bg-blue-950/40'
      } backdrop-blur-sm p-6 rounded-lg border ${
        isActive ? 'border-purple-500/50' : 'border-blue-900/30'
      }`}
    >
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg animate-pulse"></div>
      )}
      <div className="flex items-center space-x-4 relative z-10">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full ${
            isActive
              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
              : 'bg-blue-900/50'
          }`}
        >
          <Icon
            className={`h-6 w-6 ${isActive ? 'text-white' : 'text-purple-400'}`}
          />
        </div>
        <div>
          <span className="text-lg font-medium text-white">
            {text}
            {index === 2 && (
              <span className="ml-1 text-pink-400 font-bold">60%</span>
            )}
          </span>
          <p className="text-gray-400 mt-1">{detail}</p>
        </div>
      </div>
    </div>
  )
);

const WhyInfluzio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Use Intersection Observer for triggering animations
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Auto-advance steps every 3 seconds
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 3000);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      clearInterval(interval);
    };
  }, []);

  const handleGetStartedClick = () => {
    console.log('Get Started button clicked!');
    navigate('/apply-now');
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  // Steps data
  const steps = [
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
      detail: 'The more engagement your post gets, the higher your rewards',
    },
  ];

  return (
    <div ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
      {/* Background blobs with reduced animations */}
      <div
        className={`absolute -right-64 top-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl transition-opacity duration-1000 ${
          isVisible ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(0.5)',
          transition: 'transform 1s, opacity 1s',
        }}
      ></div>
      <div
        className={`absolute -left-64 bottom-20 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl transition-opacity duration-1000 ${
          isVisible ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(0.5)',
          transition: 'transform 1s, opacity 1s',
          transitionDelay: '0.2s',
        }}
      ></div>

      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTQuNWExIDEgMCAwIDAtMS0xaC00YTEgMSAwIDAgMC0xIDF2NC41aDJ2LTMuNWgydjMuNWgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:text-center">
          <h2
            className={`text-base text-purple-400 font-semibold tracking-wide uppercase flex items-center justify-center gap-2 before:content-[''] before:h-px before:w-8 before:bg-purple-400 after:content-[''] after:h-px after:w-8 after:bg-purple-400 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-6'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400 inline mr-1" /> Why
            Influzio?{' '}
            <Sparkles className="w-4 h-4 text-purple-400 inline ml-1" />
          </h2>
          <p
            className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white transition-all duration-700 delay-100 ${
              isVisible
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-6'
            }`}
          >
            Influence is for everyone!
          </p>
        </div>

        <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-12">
          <div
            className={`lg:col-span-7 transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-8'
            }`}
          >
            <div className="p-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
              <div className="bg-black rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-purple-400" />
                  <p className="text-xl text-gray-100 font-medium">
                    <span
                      className={`font-bold bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 delay-100 ${
                        isVisible
                          ? 'bg-[length:100%_2px] text-white'
                          : 'bg-[length:0%_2px] text-gray-100'
                      } bg-no-repeat bg-[position:0_88%]`}
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
                      className={`font-bold bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 delay-300 ${
                        isVisible
                          ? 'bg-[length:100%_2px] text-white'
                          : 'bg-[length:0%_2px] text-gray-100'
                      } bg-no-repeat bg-[position:0_88%]`}
                    >
                      real rewards, real impact.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`mt-12 transition-all duration-700 delay-400 ${
                isVisible
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-0 transform translate-y-8'
              }`}
            >
              <p className="text-lg font-medium text-white mb-6">
                How it works:
              </p>
              <div className="grid gap-3">
                {steps.map((step, index) => (
                  <StepItem
                    key={index}
                    icon={step.icon}
                    text={step.text}
                    detail={step.detail}
                    isActive={activeStep === index}
                    index={index}
                    onClick={() => handleStepClick(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className={`mt-12 lg:mt-0 lg:col-span-5 transition-all duration-700 delay-500 ${
              isVisible
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-10'
            }`}
          >
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

export default memo(WhyInfluzio);
