import { motion } from 'framer-motion';

const Privacy = () => {
  const sections = [
    {
      title: 'Introduction',
      content:
        'Influzio values your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.',
    },
    {
      title: 'Information We Collect',
      content: [
        'Personal Information: Name, email address, phone number, Instagram handle, and other account details.',
        'Usage Data: Details on how you interact with our platform including visit times, pages viewed, and actions taken.',
        'Social Media Insights: Post reach, engagement data, and screenshots for verification purposes.',
      ],
    },
    {
      title: 'How We Use Your Information',
      content: [
        'Register and manage user accounts',
        'Provide cashback rewards and verify eligibility',
        'Improve our services and user experience',
        'Communicate updates, offers, and notifications',
        'Ensure security and detect fraud or misuse',
      ],
    },
    {
      title: 'Sharing Your Information',
      content:
        'Influzio does not sell or rent your personal information. We may share your information with partnered brands (only relevant data, where required), payment processors for withdrawals, and legal authorities, if required by law.',
    },
    {
      title: 'Data Storage & Security',
      content:
        'We implement industry-standard security protocols to protect your information. However, no electronic transmission over the internet is 100% secure.',
    },
    {
      title: 'Cookies & Tracking Technologies',
      content:
        'Influzio uses cookies to enhance user experience and analyze traffic. Users can manage cookie preferences through browser settings.',
    },
    {
      title: 'Your Data Rights',
      content: [
        'Access the information we hold about you',
        'Request correction or deletion of your data',
        'Withdraw consent at any time',
        "Lodge a complaint with the UK Information Commissioner's Office (ICO)",
      ],
    },
    {
      title: 'Third-Party Links',
      content:
        'Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.',
    },
    {
      title: 'Changes to This Policy',
      content:
        'We may update this Privacy Policy periodically. Users will be notified of significant changes via email or on the platform.',
    },
    {
      title: 'Contact Us',
      content:
        'If you have questions or concerns about this Privacy Policy, please contact us at: saifmjmj17@gmail.com',
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
              Privacy Policy
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
                {Array.isArray(section.content) ? (
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300">{section.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Privacy;
