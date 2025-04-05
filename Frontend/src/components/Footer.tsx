
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-travel-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-travel-blue mr-2" />
              <span className="font-bold text-xl">WanderLust Canvas</span>
            </div>
            <p className="text-gray-300 mb-4">
              Explore destinations around the world and plan your perfect journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-travel-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-travel-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-travel-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-travel-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-300 hover:text-travel-blue transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/subscriptions" className="text-gray-300 hover:text-travel-blue transition-colors">Subscription Plans</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-travel-blue transition-colors">Sign In</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destination/Bali,%20Indonesia" className="text-gray-300 hover:text-travel-blue transition-colors">Bali, Indonesia</Link>
              </li>
              <li>
                <Link to="/destination/Paris,%20France" className="text-gray-300 hover:text-travel-blue transition-colors">Paris, France</Link>
              </li>
              <li>
                <Link to="/destination/Tokyo,%20Japan" className="text-gray-300 hover:text-travel-blue transition-colors">Tokyo, Japan</Link>
              </li>
              <li>
                <Link to="/destination/New%20York%20City,%20USA" className="text-gray-300 hover:text-travel-blue transition-colors">New York City, USA</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-travel-blue mr-2 mt-0.5" />
                <span className="text-gray-300">123 Travel Street, Global City</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-travel-blue mr-2" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-travel-blue mr-2" />
                <span className="text-gray-300">info@wanderlustcanvas.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} WanderLust Canvas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
