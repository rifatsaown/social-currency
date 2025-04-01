import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/20 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Influzio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The UK&apos;s 1st influence-driven cashback platform — designed for
            everyday content creators and local brands who believe in real
            engagement over empty hype.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">
                How It Works
              </h2>
              <div className="space-y-6">
                {[
                  'Tag a partnered local brand in your Instagram post or reel',
                  'Submit the post link to Influzio',
                  'Earn cashback based on your reach — no strings attached',
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-purple-400 mt-1" />
                    <p className="text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xl text-purple-400 font-medium">
                Simple. Fair. Transparent.
              </p>
            </div>

            <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">
                Why Brands Join Influzio
              </h2>
              <div className="space-y-4">
                {[
                  'Get authentic exposure from real people, not big-budget campaigns',
                  'Only pay when there&apos;s performance (reach, views, engagement)',
                  'Build your local reputation and social proof — fast',
                  'Zero upfront cost, maximum visibility',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-purple-400 mt-1" />
                    <p className="text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">
                Why Influencers Love Influzio
              </h2>
              <div className="space-y-4">
                {[
                  'Get paid for what you already do — sharing your life on Instagram',
                  'No contracts. No approvals. No pressure.',
                  'Join for free and earn rewards based on your real impact',
                  'Work with brands that align with your lifestyle',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-purple-400 mt-1" />
                    <p className="text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">
                What Makes Us Different
              </h2>
              <p className="text-gray-300 mb-4">
                While others focus on big influencers and hype, we believe
                micro-influence is the future. Influzio is built for the 800–10K
                follower creators who truly influence their community.
              </p>
              <p className="text-gray-300">
                We&apos;re not a card. We&apos;re not an ad agency. We&apos;re a
                movement of creators and local brands, building a fairer,
                smarter influence economy — one post at a time.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
