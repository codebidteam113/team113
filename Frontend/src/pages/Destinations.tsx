
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Destinations: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock destinations data
  const mockDestinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      category: "beach",
      region: "asia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&h=400&q=80",
      rating: 4.8,
      description: "Lush landscapes, pristine beaches, and rich cultural heritage."
    },
    {
      id: 2,
      name: "Santorini, Greece",
      category: "beach",
      region: "europe",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&h=400&q=80",
      rating: 4.9,
      description: "Stunning sunsets, whitewashed buildings, and crystal-clear waters."
    },
    {
      id: 3,
      name: "Kyoto, Japan",
      category: "culture",
      region: "asia",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&h=400&q=80",
      rating: 4.7,
      description: "Ancient temples, traditional gardens, and authentic Japanese culture."
    },
    {
      id: 4,
      name: "Paris, France",
      category: "city",
      region: "europe",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=400&q=80",
      rating: 4.6,
      description: "Iconic landmarks, world-class cuisine, and romantic atmosphere."
    },
    {
      id: 5,
      name: "Machu Picchu, Peru",
      category: "adventure",
      region: "americas",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=600&h=400&q=80",
      rating: 4.9,
      description: "Ancient Incan citadel set amidst breathtaking mountain scenery."
    },
    {
      id: 6,
      name: "New York City, USA",
      category: "city",
      region: "americas",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&h=400&q=80",
      rating: 4.7,
      description: "Iconic skyline, diverse neighborhoods, and endless entertainment."
    },
    {
      id: 7,
      name: "Cape Town, South Africa",
      category: "adventure",
      region: "africa",
      image: "https://images.unsplash.com/photo-1576485375217-d6a95e34d043?auto=format&fit=crop&w=600&h=400&q=80",
      rating: 4.6,
      description: "Stunning landscapes, vibrant culture, and diverse wildlife."
    },
    {
      id: 8,
      name: "Venice, Italy",
      category: "culture",
      region: "europe",
      image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=600&h=400&q=80",
      rating: 4.5,
      description: "Romantic canals, historic architecture, and unique character."
    }
  ];

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setDestinations(mockDestinations);
      setFilteredDestinations(mockDestinations);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = destinations.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations(destinations);
    }
  }, [searchTerm, destinations]);

  const handleTabChange = (value: string) => {
    if (value === "all") {
      setFilteredDestinations(destinations);
    } else {
      const filtered = destinations.filter(dest => dest.category === value || dest.region === value);
      setFilteredDestinations(filtered);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Additional search logic could be added here
  };

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-navy/80 to-travel-purple/80" />
        <div
          className="h-[30vh] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1920&h=600&q=80")' }}
        >
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Explore Destinations
            </h1>
            <form onSubmit={handleSearch} className="max-w-lg mx-auto">
              <div className="relative flex items-center">
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Filter tabs */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="py-4">
            <h2 className="text-lg font-medium mb-3">Explore by Category</h2>
            <Tabs defaultValue="all" onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-5 max-w-2xl">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="beach">Beaches</TabsTrigger>
                <TabsTrigger value="city">Cities</TabsTrigger>
                <TabsTrigger value="culture">Culture</TabsTrigger>
                <TabsTrigger value="adventure">Adventure</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="py-4">
            <h2 className="text-lg font-medium mb-3">Explore by Region</h2>
            <Tabs defaultValue="all" onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-5 max-w-2xl">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="europe">Europe</TabsTrigger>
                <TabsTrigger value="asia">Asia</TabsTrigger>
                <TabsTrigger value="americas">Americas</TabsTrigger>
                <TabsTrigger value="africa">Africa</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Destinations grid */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredDestinations.length} Destinations Found
            </h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDestinations.map((destination) => (
                <Card
                  key={destination.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                  onClick={() => navigate(`/destination/${encodeURIComponent(destination.name)}`)}
                >
                  <div className="h-48 w-full overflow-hidden relative">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {destination.rating}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start mb-2">
                      <MapPin className="h-4 w-4 text-travel-blue mr-1 mt-1 shrink-0" />
                      <h3 className="text-lg font-semibold">{destination.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{destination.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredDestinations.length === 0 && !loading && (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium text-gray-700">No destinations found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
              <Button 
                className="mt-4 bg-travel-blue hover:bg-travel-teal"
                onClick={() => {
                  setSearchTerm("");
                  setFilteredDestinations(destinations);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
