import { motion } from 'framer-motion';

const Terms = () => {
  const sections = [
    {
      title: 'Introduction',
      content:
        'Welcome to Influzio. These Terms and Conditions govern your use of our platform, services, website, and any interactions you may have with our brand, including influencer and brand partner activities. By accessing or using our services, you agree to be bound by these terms.',
    },
    {
      title: 'Eligibility',
      content:
        "You must be at least 18 years old to use Influzio's services. Influencers must have a minimum of 500 Instagram followers and a public account to qualify for cashback.",
    },
    {
      title: 'Account Registration',
      content:
        'Users must register and provide accurate information. Influzio reserves the right to suspend or terminate accounts if false or misleading information is provided.',
    },
    {
      title: 'Cashback Terms',
      content:
        'Cashback will be calculated based on your social media reach, verified by Influzio through post insights. Influencers must tag partnered brands and use #Influzio in their Instagram posts, stories, or reels to qualify for cashback.',
    },
    {
      title: 'Wallet and Payouts',
      content:
        'Earnings will be stored in your Influzio Wallet. Minimum withdrawal is £10. Withdrawal requests are processed within 3-5 business days after manual verification.',
    },
    {
      title: 'Brand Partner Obligations',
      content:
        'Brands must provide honest and accurate details. Influzio may feature brand names, logos, and promotional offers on the platform for promotional purposes.',
    },
    {
      title: 'Content & Conduct',
      content:
        'Influzio does not endorse or take responsibility for user-generated content. Any offensive, discriminatory, or misleading content is grounds for account termination.',
    },
    {
      title: 'Data Privacy',
      content:
        'Your data will be processed in accordance with our Privacy Policy. Influzio will never sell or share personal data without your consent.',
    },
    {
      title: 'Modifications',
      content:
        'Influzio reserves the right to modify these Terms and Conditions at any time. Users will be notified of any changes through the platform or email.',
    },
    {
      title: 'Governing Law',
      content:
        'These Terms and Conditions are governed by UK law. Any disputes will be subject to the exclusive jurisdiction of UK courts.',
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 text-white pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-200">
              Terms and Conditions
            </h1>
            <p className="text-purple-200/90">Effective Date: March 2025</p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-semibold mb-4 text-purple-200">
                  {section.title}
                </h2>
                <p className="text-gray-300">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
