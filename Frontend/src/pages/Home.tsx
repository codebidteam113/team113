
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, Globe, Compass, Heart, MapPin } from "lucide-react";

const Home: React.FC = () => {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
 
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a destination",
      });
      return;
    }
    navigate(`/destination/${encodeURIComponent(destination)}`);
  };

  const popularDestinations = [
    { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&h=200&q=80" },
  ];

  const features = [
    {
      icon: <Globe className="h-10 w-10 text-travel-blue" />,
      title: "Explore Global Destinations",
      description: "Discover hidden gems and popular landmarks across the world."
    },
    {
      icon: <Compass className="h-10 w-10 text-travel-teal" />,
      title: "Personalized Recommendations",
      description: "Get tailored travel suggestions based on your preferences."
    },
    {
      icon: <Heart className="h-10 w-10 text-travel-coral" />,
      title: "Curated Experiences",
      description: "Access unique activities recommended by local guides."
    },
    {
      icon: <MapPin className="h-10 w-10 text-travel-purple" />,
      title: "Interactive Travel Maps",
      description: "Plan your journey with our detailed and interactive maps."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-navy/80 to-travel-teal/80" />
        <div
          className="h-[70vh] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&h=1080&q=80")' }}
        >
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Extraordinary Travel Stories
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Explore destinations through the eyes of real travelers and create your perfect journey
            </p>
           
            <form onSubmit={handleSearch} className="max-w-lg mx-auto">
              <div className="relative flex items-center">
                <Input
                  type="text"
                  placeholder="Where would you like to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 py-6 rounded-full bg-white/90 backdrop-blur-sm focus-visible:ring-travel-blue"
                />
                <Search className="absolute left-3 h-5 w-5 text-gray-400" />
                <Button
                  type="submit"
                  className="absolute right-1.5 rounded-full bg-travel-blue hover:bg-travel-teal"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
     
      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Discover the World with Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
     
      {/* Popular Destinations */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <Card
                key={destination.name}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/destination/${encodeURIComponent(destination.name)}`)}
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{destination.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
         
          <div className="text-center mt-10">
            <Button
              className="bg-travel-blue hover:bg-travel-teal text-white"
              onClick={() => navigate("/destinations")}
            >
              Discover More Destinations
            </Button>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-travel-navy text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join our travel community and get personalized recommendations for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-travel-coral hover:bg-travel-coral/80"
              onClick={() => navigate("/subscriptions")}
            >
              See Our Plans
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-travel-navy"
              onClick={() => navigate("/login")}
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
