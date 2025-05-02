import { motion } from 'framer-motion';
// import gsap from 'gsap';
import {
  ArrowRight,
  CheckCircle,
  Instagram,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { FormField } from '../../Interface';
import { submitEligibilityRequest } from '../../services/api';

function GetStart() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    instagramHandle: '',
    mobileNumber: '',
    email: '',
    city: '',
  });

  // Form validation state
  const [formStep, setFormStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  // Handle input change

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: FormField = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form fields
  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    if (formStep === 0) {
      if (!formData.fullName) newErrors.fullName = 'Full Name is required';
      if (!formData.instagramHandle)
        newErrors.instagramHandle = 'Instagram Handle is required';
    } else if (formStep === 1) {
      if (!formData.mobileNumber)
        newErrors.mobileNumber = 'Mobile Number is required';
      if (!formData.email) newErrors.email = 'Email Address is required';
    } else if (formStep === 2) {
      if (!formData.city) newErrors.city = 'City is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsSubmitting(true);
    setApiError(null);
    try {
      await submitEligibilityRequest(formData);
      setIsSubmitting(false);
      setShowSuccess(true);
    } catch (error: unknown) {
      setIsSubmitting(false);
      setApiError('Failed to submit the application. Please try again later.');
      console.error('Error submitting form:', error);
    }
  };

  // Animated background elements
  // useEffect(() => {
  //   const particles = document.querySelectorAll('.bg-particle');
  //   particles.forEach((particle) => {
  //     gsap.to(particle, {
  //       x: `random(-100, 100)`,
  //       y: `random(-100, 100)`,
  //       rotation: `random(-180, 180)`,
  //       opacity: `random(0.1, 0.3)`,
  //       duration: `random(15, 30)`,
  //       repeat: -1,
  //       yoyo: true,
  //       ease: 'sine.inOut',
  //     });
  //   });
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-hidden relative py-8">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="bg-particle absolute rounded-full bg-purple-500/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 py-10"
        >
          {/* Left side content */}
          <div className="lg:w-5/12 relative">
            {/* Decorative element */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 blur-xl" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative z-10"
            >
              <span className="inline-block bg-gradient-to-r from-purple-500/20 to-purple-700/20 px-4 py-2 rounded-full text-purple-300 font-medium mb-4">
                WELCOME TO THE INFLUZIO REVOLUTION
              </span>

              <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-200">
              The UK’s 1st influence-powered cashback platform
              </h1>

              <p className="text-xl text-purple-200/90 mb-8">
                Turn your social influence into real financial benefits. Join
                our exclusive community of influencers.
              </p>

              <div className="">
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* <div className="w-14 h-14 bg-purple-500/10 backdrop-blur-lg rounded-full flex items-center justify-center mr-3 border border-purple-500/20">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 6V12L16 14"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                   <div>
                    <p className="text-sm text-gray-400">Verified by</p>
                    <p className="font-bold">VISA</p>
                  </div> */}
                </motion.div>

                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-14 h-14 bg-purple-500/10 backdrop-blur-lg rounded-full flex items-center justify-center mr-3 border border-purple-500/20">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12L11 14L15 10"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Secure</p>
                    <p className="font-bold">TRANSACTION</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right side form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:w-7/12 relative"
          >
            <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl" />

            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-8 rounded-2xl backdrop-blur-md border border-purple-700/20 shadow-xl relative">
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-center">
                    Application Submitted!
                  </h3>
                  <p className="text-center text-gray-300 mb-8 max-w-md">
                    We'll review your eligibility and get back to you shortly.
                    Check your email for updates.
                  </p>
                  <button
                    onClick={() => {
                      setShowSuccess(false);
                      setFormData({
                        fullName: '',
                        instagramHandle: '',
                        mobileNumber: '',
                        email: '',
                        city: '',
                      });
                      setFormStep(0);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-8 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                  >
                    Apply for Another Account
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">
                      GET PRIORITY ACCESS
                    </h2>
                    <p className="text-purple-300">ELIGIBILITY CRITERIA</p>

                    <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
                      <motion.div
                        className="flex items-center p-4 bg-purple-800/20 rounded-xl backdrop-blur-sm border border-purple-500/20"
                        whileHover={{ scale: 1.03 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 shadow-lg">
                          <Instagram size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-xl">500+</p>
                          <p className="text-sm text-gray-300">
                            Instagram followers
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-center p-4 bg-purple-800/20 rounded-xl backdrop-blur-sm border border-purple-500/20"
                        whileHover={{ scale: 1.03 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 shadow-lg">
                          <Instagram size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-xl">PUBLIC</p>
                          <p className="text-sm text-gray-300">
                            Instagram account
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="mb-8 relative">
                    <div className="flex justify-between items-center relative z-10">
                      {['Personal Info', 'Contact Details', 'Location'].map(
                        (step, i) => (
                          <motion.button
                            key={i}
                            onClick={() => i <= formStep && setFormStep(i)}
                            className={`flex flex-col items-center ${
                              i <= formStep
                                ? 'cursor-pointer'
                                : 'cursor-not-allowed opacity-50'
                            }`}
                            whileHover={i <= formStep ? { scale: 1.05 } : {}}
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                                i < formStep
                                  ? 'bg-green-500'
                                  : i === formStep
                                  ? 'bg-purple-500'
                                  : 'bg-purple-800/50'
                              }`}
                            >
                              {i < formStep ? (
                                <CheckCircle size={20} className="text-white" />
                              ) : (
                                <span className="text-white font-medium">
                                  {i + 1}
                                </span>
                              )}
                            </div>
                            <span className="text-xs hidden sm:block">
                              {step}
                            </span>
                          </motion.button>
                        )
                      )}
                    </div>
                    <div className="absolute top-5 h-1 bg-purple-800/50 w-full rounded-full -z-0"></div>
                    <motion.div
                      className="absolute top-5 h-1 bg-purple-500 rounded-full -z-0"
                      initial={{ width: '0%' }}
                      animate={{ width: `${formStep * 50}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Personal Info */}
                    {formStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-6">
                          <div
                            className={`relative ${
                              focusedField === 'fullName' || formData.fullName
                                ? 'bg-purple-900/40'
                                : 'bg-purple-950/70'
                            } p-1 rounded-lg border ${
                              focusedField === 'fullName'
                                ? 'border-purple-500'
                                : 'border-purple-800/50'
                            } transition-all duration-200 group`}
                          >
                            <label
                              className={`absolute ${
                                focusedField === 'fullName' || formData.fullName
                                  ? '-top-2.5 left-3 text-xs bg-purple-900/80 px-2 py-0.5 rounded'
                                  : 'top-4.5 left-9.5 -z-10'
                              } text-sm text-gray-300 transition-all duration-200 `}
                            >
                              Full Name{' '}
                              <span className="text-purple-400">*</span>
                            </label>
                            <div className="flex items-center">
                              <User size={18} className="text-gray-400 ml-3" />
                              <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('fullName')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full p-3 pl-3 bg-transparent focus:outline-none text-white"
                                required
                              />
                            </div>
                          </div>
                          {errors.fullName && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div className="mb-6">
                          <div
                            className={`relative ${
                              focusedField === 'instagramHandle' ||
                              formData.instagramHandle
                                ? 'bg-purple-900/40'
                                : 'bg-purple-950/70'
                            } p-1 rounded-lg border ${
                              focusedField === 'instagramHandle'
                                ? 'border-purple-500'
                                : 'border-purple-800/50'
                            } transition-all duration-200`}
                          >
                            <label
                              className={`absolute ${
                                focusedField === 'instagramHandle' ||
                                formData.instagramHandle
                                  ? '-top-2.5 left-3 text-xs bg-purple-900/80 px-2 py-0.5 rounded'
                                  : 'top-4.5 left-9.5 -z-10'
                              } text-sm text-gray-300 transition-all duration-200`}
                            >
                              Instagram Handle{' '}
                              <span className="text-purple-400">*</span>
                            </label>
                            <div className="flex items-center">
                              <Instagram
                                size={18}
                                className="text-gray-400 ml-3"
                              />
                              <input
                                type="text"
                                name="instagramHandle"
                                value={formData.instagramHandle}
                                onChange={handleChange}
                                onFocus={() =>
                                  setFocusedField('instagramHandle')
                                }
                                onBlur={() => setFocusedField(null)}
                                className="w-full p-3 pl-3 bg-transparent focus:outline-none text-white"
                                required
                              />
                            </div>
                          </div>
                          {errors.instagramHandle && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.instagramHandle}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-end">
                          <motion.button
                            type="button"
                            onClick={() => {
                              if (validateFields()) setFormStep(1);
                            }}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Continue <ArrowRight size={18} className="ml-2" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Contact Details */}
                    {formStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-6">
                          <div
                            className={`relative ${
                              focusedField === 'mobileNumber' ||
                              formData.mobileNumber
                                ? 'bg-purple-900/40'
                                : 'bg-purple-950/70'
                            } p-1 rounded-lg border ${
                              focusedField === 'mobileNumber'
                                ? 'border-purple-500'
                                : 'border-purple-800/50'
                            } transition-all duration-200`}
                          >
                            <label
                              className={`absolute ${
                                focusedField === 'mobileNumber' ||
                                formData.mobileNumber
                                  ? '-top-2.5 left-3 text-xs bg-purple-900/80 px-2 py-0.5 rounded'
                                  : 'top-4.5 left-9.5 -z-10'
                              } text-sm text-gray-300 transition-all duration-200`}
                            >
                              Mobile Number{' '}
                              <span className="text-purple-400">*</span>
                            </label>
                            <div className="flex items-center">
                              <Phone size={18} className="text-gray-400 ml-3" />
                              <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('mobileNumber')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full p-3 pl-3 bg-transparent focus:outline-none text-white"
                                required
                              />
                            </div>
                          </div>
                          {errors.mobileNumber && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.mobileNumber}
                            </p>
                          )}
                        </div>

                        <div className="mb-6">
                          <div
                            className={`relative ${
                              focusedField === 'email' || formData.email
                                ? 'bg-purple-900/40'
                                : 'bg-purple-950/70'
                            } p-1 rounded-lg border ${
                              focusedField === 'email'
                                ? 'border-purple-500'
                                : 'border-purple-800/50'
                            } transition-all duration-200`}
                          >
                            <label
                              className={`absolute ${
                                focusedField === 'email' || formData.email
                                  ? '-top-2.5 left-3 text-xs bg-purple-900/80 px-2 py-0.5 rounded'
                                  : 'top-4.5 left-9.5 -z-10'
                              } text-sm text-gray-300 transition-all duration-200`}
                            >
                              Email Address{' '}
                              <span className="text-purple-400">*</span>
                            </label>
                            <div className="flex items-center">
                              <Mail size={18} className="text-gray-400 ml-3" />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full p-3 pl-3 bg-transparent focus:outline-none text-white"
                                required
                              />
                            </div>
                          </div>
                          {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between">
                          <motion.button
                            type="button"
                            onClick={() => setFormStep(0)}
                            className="bg-purple-900/50 hover:bg-purple-900/70 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Back
                          </motion.button>
                          <motion.button
                            type="button"
                            onClick={() => {
                              if (validateFields()) setFormStep(2);
                            }}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Continue <ArrowRight size={18} className="ml-2" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Location */}
                    {formStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-6">
                          <div
                            className={`relative ${
                              focusedField === 'city' || formData.city
                                ? 'bg-purple-900/40'
                                : 'bg-purple-950/70'
                            } p-1 rounded-lg border ${
                              focusedField === 'city'
                                ? 'border-purple-500'
                                : 'border-purple-800/50'
                            } transition-all duration-200`}
                          >
                            <label
                              className={`absolute ${
                                focusedField === 'city' || formData.city
                                  ? '-top-2.5 left-3 text-xs bg-purple-900/80 px-2 py-0.5 rounded'
                                  : 'top-4.5 left-9.5 -z-10'
                              } text-sm text-gray-300 transition-all duration-200`}
                            >
                              City <span className="text-purple-400">*</span>
                            </label>
                            <div className="flex items-center">
                              <MapPin
                                size={18}
                                className="text-gray-400 ml-3"
                              />
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('city')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full p-3 pl-3 bg-transparent focus:outline-none text-white"
                                required
                              />
                            </div>
                          </div>
                          {errors.city && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.city}
                            </p>
                          )}
                        </div>

                        {/* Terms and conditions */}
                        <div className="mb-6">
                          <label className="flex items-start cursor-pointer group">
                            <input
                              type="checkbox"
                              className="mr-3 mt-1 accent-purple-600"
                              required
                            />
                            <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                              I agree to the{' '}
                              <a
                                href="#"
                                className="text-purple-400 hover:text-purple-300 underline"
                              >
                                Terms of Service
                              </a>{' '}
                              and{' '}
                              <a
                                href="#"
                                className="text-purple-400 hover:text-purple-300 underline"
                              >
                                Privacy Policy
                              </a>
                            </span>
                          </label>
                        </div>

                        {apiError && (
                          <p className="text-red-400 text-sm mb-6">
                            {apiError}
                          </p>
                        )}

                        <div className="flex justify-between">
                          <motion.button
                            type="button"
                            onClick={() => setFormStep(1)}
                            className="bg-purple-900/50 hover:bg-purple-900/70 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Back
                          </motion.button>
                          <motion.button
                            type="submit"
                            className={`py-3 px-10 rounded-lg font-bold ${
                              isSubmitting
                                ? 'bg-purple-800 text-purple-100 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                            } transition-all duration-300 flex items-center`}
                            disabled={isSubmitting}
                            whileHover={isSubmitting ? {} : { scale: 1.03 }}
                            whileTap={isSubmitting ? {} : { scale: 0.98 }}
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              'CHECK ELIGIBILITY'
                            )}
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 
      <motion.div
        className="fixed bottom-6 right-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <button className="bg-gradient-to-r from-teal-500 to-teal-400 text-white p-4 rounded-full flex items-center justify-center shadow-lg">
          <span className="mr-2 font-medium">Help</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 17H12.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </motion.div> */}
    </div>
  );
}

export default GetStart;
