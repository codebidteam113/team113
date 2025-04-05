import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Search, Map, ChevronDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Determine if user is a creator (for demo, we'll check if email starts with 'creator')
  const isCreator = user?.email?.startsWith('creator');

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#58D4C9]">
            WanderLust Canvas
          </span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <Link 
            to="/explore" 
            className="flex items-center px-3 py-1.5 rounded hover:bg-black hover:text-white transition-colors mr-4"
          >
            <Map className="h-4 w-4 mr-1" />
            Explore
          </Link>
          <Link 
            to="/search" 
            className="flex items-center px-3 py-1.5 rounded hover:bg-black hover:text-white transition-colors mr-4"
          >
            <Search className="h-4 w-4 mr-1" />
            Search
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              {isCreator && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/create')}
                  className="flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  <span>Create</span>
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                  >
                    <User className="h-4 w-4 mr-1" />
                    <span className="mx-1">Demo User</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/account')}>
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/subscriptions')}>
                    Subscription
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
