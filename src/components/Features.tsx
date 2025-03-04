import gsap from 'gsap';
import { CreditCard, Heart, Share2, TrendingUp } from 'lucide-react';
import { useEffect, useRef } from 'react';

const features = [
  {
    name: 'Social Currency',
    description:
      'Your social media engagement directly impacts your card benefits and rewards.',
    icon: Heart,
  },
  {
    name: 'Influencer Benefits',
    description:
      'Special perks and higher limits based on your social media influence and reach.',
    icon: TrendingUp,
  },
  {
    name: 'Share & Earn',
    description:
      'Share your experiences with the INFLUZIO card and earn additional rewards and cashback.',
    icon: Share2,
  },
  {
    name: 'Premium Card',
    description:
      'Exclusive design with premium materials and contactless technology.',
    icon: CreditCard,
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const featureRefs = useRef<HTMLDivElement[]>([]);
  const gridLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    featureRefs.current = [];

    const createGridLines = () => {
      if (!gridLinesRef.current) return;
      gridLinesRef.current.innerHTML = '';
      const fragment = document.createDocumentFragment();
      const lineCount = 20;

      for (let i = 0; i < lineCount; i++) {
        const isHorizontal = Math.random() > 0.5;
        const line = document.createElement('div');
        line.className =
          'absolute bg-gradient-to-r from-transparent via-purple-500/20 to-transparent';

        if (isHorizontal) {
          line.style.height = '1px';
          line.style.width = '100%';
          line.style.top = `${Math.random() * 100}%`;
        } else {
          line.style.width = '1px';
          line.style.height = '100%';
          line.style.left = `${Math.random() * 100}%`;
          line.style.background =
            'linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.2), transparent)';
        }

        fragment.appendChild(line);
      }

      gridLinesRef.current.appendChild(fragment);

      gsap.utils.toArray(gridLinesRef.current.children).forEach((line) => {
        gsap.to(line as HTMLElement, {
          opacity: 0.05,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    };

    const initAnimations = () => {
      gsap.set(
        [headingRef.current, subHeadingRef.current, descriptionRef.current],
        {
          opacity: 0,
          y: 30,
        }
      );
      featureRefs.current.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 60, scale: 0.9 });
      });

      gsap
        .timeline()
        .to(headingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        })
        .to(
          subHeadingRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
        .to(
          descriptionRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );

      gsap.to(featureRefs.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.4)',
      });
    };

    setTimeout(() => {
      createGridLines();
      initAnimations();
    }, 100);
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };

  return (
    <div ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
      <div
        ref={gridLinesRef}
        className="absolute inset-0 opacity-30 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:text-center">
          <h2
            ref={headingRef}
            className="text-base text-purple-400 font-semibold tracking-wide uppercase"
          >
            Why Choose INFLUZIO
          </h2>
          <p
            ref={subHeadingRef}
            className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-white"
          >
            The Future of Social Banking
          </p>
          <p
            ref={descriptionRef}
            className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto"
          >
            INFLUZIO combines financial services with social media influence,
            creating a revolutionary new way to bank.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              ref={addToRefs}
              className="group transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative bg-blue-950 rounded-lg px-6 pb-8 h-full backdrop-blur-sm border border-blue-900/30 shadow-lg hover:shadow-xl">
                <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="-mt-6 relative flex items-center justify-center">
                  <feature.icon className="h-12 w-12 text-purple-400 transition-all duration-300 group-hover:text-pink-400" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-white tracking-tight text-center">
                  {feature.name}
                </h3>
                <p className="mt-5 text-base text-gray-400 text-center">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
