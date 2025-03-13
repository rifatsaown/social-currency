import { motion, Variants } from 'framer-motion';
import { LucideIcon, Mail, Phone } from 'lucide-react';
import { memo, useMemo } from 'react';
import { ceoProfile } from '../asset';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
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

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Memoized contact item component
const ContactItem = memo(
  ({
    icon: Icon,
    text,
    link,
  }: {
    icon: LucideIcon;
    text: string;
    link?: string;
  }) => (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
      whileHover={{ scale: 1.05, x: 5 }}
      variants={itemVariants}
    >
      <div className="relative">
        <Icon className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
        <div className="absolute -inset-2 bg-purple-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="text-gray-300 group-hover:text-white transition-colors">
        {text}
      </span>
    </motion.a>
  )
);

const Team = () => {
  // Memoize contact information
  const contactInfo = useMemo(
    () => [
      {
        icon: Mail,
        text: 'saifmjmj17@gmail.com',
        link: 'mailto:saifmjmj17@gmail.com',
      },
      {
        icon: Phone,
        text: '+44 7496342877',
        link: 'tel:+447496342877',
      },
      //   {
      //     icon: Linkedin,
      //     text: 'Md Saiful Alam',
      //     // link: 'https://linkedin.com/in/md-saiful-alam',
      //   },
    ],
    []
  );

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/20 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4 relative inline-block">
            Our Leadership
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-purple-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* CEO Image */}
          <motion.div
            className="relative group"
            variants={imageVariants}
            whileHover="hover"
          >
            <div className="relative z-10">
              <img
                src={ceoProfile}
                alt="Md Saiful Alam"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="absolute -inset-4 bg-purple-500/20 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* CEO Details */}
          <motion.div
            className="space-y-6 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-colors duration-300"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-white mb-2 relative inline-block">
                Md Saiful Alam
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
              </h3>
              <p className="text-purple-400 text-xl mb-4">Founder & CEO</p>
            </motion.div>

            <motion.p
              className="text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              Md Saiful Alam is the Founder & CEO of Influzio, a pioneering
              influencer marketing platform designed to connect brands with
              micro-influencers through a performance-based cashback system.
              With a strong background in cybersecurity and AI-driven solutions,
              Saiful ensures Influzio operates securely, efficiently, and
              transparently—offering brands a cost-effective, results-driven
              marketing model while empowering influencers to monetize their
              content effortlessly.
            </motion.p>

            {/* <motion.div
              variants={itemVariants}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
            >
              <h4 className="text-xl font-semibold text-white mb-3">
                A Visionary in Tech & Digital Marketing
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Saiful holds an MSc in Applied Cyber Security from the
                University of South Wales, where he specialized in AI
                integration for cybersecurity solutions. With expertise in
                business operations, digital risk management, and
                technology-driven innovation, he is dedicated to leveraging AI
                and automation to create fair, scalable, and fraud-free
                influencer-brand collaborations.
              </p>
            </motion.div> */}

            <motion.div
              variants={itemVariants}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
            >
              <h4 className="text-xl font-semibold text-white mb-3">
                The Mission Behind Influzio
              </h4>
              <p className="text-gray-300 leading-relaxed">
                With Influzio, Saiful is transforming traditional influencer
                marketing by introducing a pay-for-performance approach—ensuring
                brands only pay for real engagement and impact while giving
                influencers a seamless way to earn. His vision is to bridge the
                gap between brands and influencers, making social media
                collaborations more accessible, transparent, and profitable for
                all.
              </p>
            </motion.div>

            <motion.div className="pt-6 space-y-3" variants={itemVariants}>
              {contactInfo.map((item, index) => (
                <ContactItem key={index} {...item} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Team);
