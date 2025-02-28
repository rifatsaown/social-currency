import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path d="M20 20 L40 20 L40 40 L20 40 Z" fill="white" />
                <path d="M60 20 L80 20 L80 40 L60 40 Z" fill="white" />
                <path d="M40 40 L60 40 L60 60 L40 60 Z" fill="white" />
                <path d="M20 60 L40 60 L40 80 L20 80 Z" fill="white" />
                <path d="M60 60 L80 60 L80 80 L60 80 Z" fill="white" />
              </svg>
              <h2 className="text-white text-2xl font-bold">INFLUZIO</h2>
            </div>
            <p className="text-gray-400 mt-2">
              Revolutionizing banking with social currency.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-4">
              Card Options
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Standard Card
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Premium Card
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Influencer Card
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Apply Now
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  123 Fintech Street, Mumbai, India 400001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-gray-400">+91 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-gray-400">info@INFLUZIO.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} INFLUZIO. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Card Agreement
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
