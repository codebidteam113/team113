
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Globe, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Globe className="h-8 w-8 text-travel-blue mr-2" />
          <span className="text-2xl font-bold bg-gradient-to-r from-travel-blue to-travel-purple bg-clip-text text-transparent">
            WanderLust Canvas
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-travel-blue transition-colors">
            Home
          </Link>
          <Link to="/destinations" className="text-gray-700 hover:text-travel-blue transition-colors">
            Destinations
          </Link>
          <Link to="/subscriptions" className="text-gray-700 hover:text-travel-blue transition-colors">
            Subscriptions
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-sm text-gray-600">
                Hello, {user?.email?.split('@')[0]}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/login')}
              className="flex items-center"
            >
              <User className="h-4 w-4 mr-1" />
              <span>Login</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
