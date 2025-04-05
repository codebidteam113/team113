import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#1aa9d8]">
            WanderLust Canvas
          </span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <Link to="/explore" className="text-gray-700 hover:text-travel-blue transition-colors mr-4">
            Explore
          </Link>
          <Link to="/search" className="text-gray-700 hover:text-travel-blue transition-colors flex items-center mr-4">
            <Search className="h-4 w-4 mr-1" />
            Search
          </Link>
          
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
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/login')}
                className="flex items-center"
              >
                <User className="h-4 w-4 mr-1" />
                <span>Login</span>
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => navigate('/signup')}
                className="flex items-center bg-travel-blue hover:bg-travel-teal"
              >
                <span>Signup</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
