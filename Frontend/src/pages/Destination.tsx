
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Filter, Camera, Heart, Clock, Utensils, MapPin, Star, Loader2 } from "lucide-react";

const Destination = () => {
  const { destination } = useParams<{ destination: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [destinationData, setDestinationData] = useState<any>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Simulate backend data fetching
  const generateDestinationData = (dest: string) => {
    return {
      name: dest,
      description: `${dest} is a vibrant destination with rich history, stunning landscapes, and delicious cuisine.`,
      image: `https://source.unsplash.com/featured/?${encodeURIComponent(dest)},landmark`,
      rating: (4 + Math.random()).toFixed(1),
      attractions: [
        { name: `${dest} Central Park`, description: "A beautiful green space in the heart of the city." },
        { name: `${dest} Historical Museum`, description: "Learn about the rich history and culture." },
      ],
      foodAndDining: {
        localCuisine: `${dest}'s cuisine is known for its unique flavors.`,
        recommendations: ["Street Food Tour", `${dest} Fine Dining`, "Cooking Class"],
      },
      practicalInfo: {
        bestTime: "Spring and Fall",
        safetyTips: "Stay mindful of your belongings.",
        localTransport: "Public transport is efficient.",
        accommodations: "Hostels to luxury resorts available.",
      }
    };
  };

  useEffect(() => {
    if (destination) {
      setLoading(true);
      setTimeout(() => {
        setDestinationData(generateDestinationData(destination));
        setLoading(false);
      }, 1500);
    }
  }, [destination]);

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId) ? prev.filter(id => id !== filterId) : [...prev, filterId]
    );
  };

  const handleApplyFilters = () => {
    if (selectedFilters.length === 0) {
      toast({ title: "No filters selected", description: "Select at least one filter." });
      return;
    }
    navigate(`/compare/${destination}`, { state: { filters: selectedFilters } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-travel-blue h-10 w-10 mr-2" />
        <p className="text-xl">Loading destination...</p>
      </div>
    );
  }

  if (!destinationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-red-500">Error loading destination data.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-navy to-travel-blue/70" />
        <div 
          className="h-[50vh] bg-cover bg-center" 
          style={{ backgroundImage: `url(${destinationData.image})` }}
        >
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <div className="flex items-center mb-2 z-10">
              <MapPin className="h-5 w-5 text-white mr-2" />
              <h1 className="text-3xl md:text-5xl font-bold text-white">{destinationData.name}</h1>
            </div>
            <div className="flex items-center text-white z-10">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span>{destinationData.rating}</span>
              <span className="ml-2 text-white/80">Traveler Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">About This Destination</h2>
          <p className="text-gray-700 mb-8">{destinationData.description}</p>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 text-travel-blue">
                <Filter className="h-4 w-4" />
                <span>Compare Experiences</span>
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Select Traveler Types</SheetTitle>
              </SheetHeader>

              <div className="py-6">
                <div className="space-y-4">
                  {['solo', 'budget', 'family'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={selectedFilters.includes(option)}
                        onCheckedChange={() => handleFilterChange(option)}
                      />
                      <Label htmlFor={option} className="capitalize">{option}</Label>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full mt-6 bg-travel-blue hover:bg-travel-teal"
                  onClick={handleApplyFilters}
                  disabled={selectedFilters.length === 0}
                >
                  Compare Experiences
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Tabs defaultValue="attractions" className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="attractions" className="flex items-center gap-1"><Camera className="h-4 w-4" /> Attractions</TabsTrigger>
              <TabsTrigger value="dining" className="flex items-center gap-1"><Utensils className="h-4 w-4" /> Food & Dining</TabsTrigger>
              <TabsTrigger value="practical" className="flex items-center gap-1"><Clock className="h-4 w-4" /> Practical Info</TabsTrigger>
            </TabsList>

            <TabsContent value="attractions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {destinationData.attractions.map((attraction: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{attraction.name}</CardTitle>
                    </CardHeader>
                    <CardContent>{attraction.description}</CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="dining">
              <Card className="mt-4">
                <CardHeader><CardTitle>Local Cuisine</CardTitle></CardHeader>
                <CardContent>
                  <p>{destinationData.foodAndDining.localCuisine}</p>
                  <ul className="list-disc list-inside mt-4">
                    {destinationData.foodAndDining.recommendations.map((rec: string, index: number) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practical">
              <Card className="mt-4">
                <CardHeader><CardTitle>Practical Information</CardTitle></CardHeader>
                <CardContent>
                  <p><strong>Best Time to Visit:</strong> {destinationData.practicalInfo.bestTime}</p>
                  <p><strong>Safety Tips:</strong> {destinationData.practicalInfo.safetyTips}</p>
                  <p><strong>Local Transportation:</strong> {destinationData.practicalInfo.localTransport}</p>
                  <p><strong>Accommodations:</strong> {destinationData.practicalInfo.accommodations}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Destination;
