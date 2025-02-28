import { Heart, TrendingUp, Share2, CreditCard } from 'lucide-react';

const features = [
  {
    name: 'Social Currency',
    description: 'Your social media engagement directly impacts your card benefits and rewards.',
    icon: Heart,
  },
  {
    name: 'Influencer Benefits',
    description: 'Special perks and higher limits based on your social media influence and reach.',
    icon: TrendingUp,
  },
  {
    name: 'Share & Earn',
    description: 'Share your experiences with the WYLD card and earn additional rewards and cashback.',
    icon: Share2,
  },
  {
    name: 'Premium Card',
    description: 'Exclusive design with premium materials and contactless technology.',
    icon: CreditCard,
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-purple-400 font-semibold tracking-wide uppercase">Why Choose WYLD</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            The Future of Social Banking
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            WYLD combines financial services with social media influence, creating a revolutionary new way to bank.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-blue-950 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;