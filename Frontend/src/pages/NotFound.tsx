
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <Globe className="h-16 w-16 text-travel-blue mx-auto mb-4 animate-pulse" />
        <h1 className="text-6xl font-bold mb-4 text-travel-navy">404</h1>
        <p className="text-2xl text-gray-600 mb-6">Oops! This destination doesn't exist</p>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for has wandered off the map. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-travel-blue hover:bg-travel-teal"
            onClick={() => navigate("/")}
          >
            Return Home
          </Button>
          <Button 
            variant="outline" 
            className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
            onClick={() => navigate("/destinations")}
          >
            Explore Destinations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
