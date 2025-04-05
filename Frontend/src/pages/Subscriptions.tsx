
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Check, CreditCard } from "lucide-react";

const Subscriptions: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 9.99,
      description: "Great for occasional travelers",
      features: [
        "1 custom itinerary per month",
        "Email support",
        "Basic destination guides",
        "Travel checklist templates",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 19.99,
      description: "Perfect for regular travelers",
      features: [
        "3 custom itineraries per month",
        "Priority email support",
        "Premium destination guides",
        "Personalized travel checklists",
        "Hotel recommendations",
        "Restaurant recommendations",
      ],
    },
    {
      id: "unlimited",
      name: "Unlimited",
      price: 39.99,
      description: "For serious travel enthusiasts",
      features: [
        "Unlimited custom itineraries",
        "24/7 priority support",
        "Premium destination guides",
        "Personalized travel checklists",
        "Hotel recommendations with special rates",
        "Restaurant recommendations with reservation assistance",
        "Local tour guide connections",
        "Emergency travel assistance",
      ],
    },
  ];

  const handleSubscribe = (plan: any) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to subscribe to a plan",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    setSelectedPlan(plan);
    setPaymentOpen(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardNumber || !expiry || !cvv || !nameOnCard) {
      toast({
        title: "Missing information",
        description: "Please fill in all payment details",
        variant: "destructive",
      });
      return;
    }

    setProcessingPayment(true);

    setTimeout(() => {
      setProcessingPayment(false);
      setPaymentOpen(false);

      toast({
        title: "Subscription successful!",
        description: `You are now subscribed to the ${selectedPlan?.name} plan.`,
      });

      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Travel Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized travel recommendations, custom itineraries, and expert advice to make your journey unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`flex flex-col border-2 ${
                plan.id === "premium" ? "border-travel-blue" : "border-gray-200"
              } ${plan.id === "premium" ? "shadow-lg" : ""}`}
            >
              {plan.id === "premium" && (
                <div className="bg-travel-blue text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.id === "premium"
                      ? "bg-travel-blue hover:bg-travel-teal"
                      : "bg-travel-navy hover:bg-travel-purple"
                  }`}
                  onClick={() => handleSubscribe(plan)}
                >
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Subscription FAQs</h2>
          <div className="text-left space-y-6">
            <div>
              <h3 className="font-semibold text-lg">Can I cancel my subscription at any time?</h3>
              <p className="text-muted-foreground">Yes, you can cancel your subscription at any time with no penalties. You'll continue to have access to your plan until the end of your current billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">How quickly will I receive my custom itinerary?</h3>
              <p className="text-muted-foreground">You will receive your custom itinerary within 48 hours of submitting your request.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Can I change my plan later?</h3>
              <p className="text-muted-foreground">Absolutely! You can upgrade or downgrade your plan at any time. Changes will take effect on your next billing cycle.</p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Subscribe to the {selectedPlan?.name} plan for ${selectedPlan?.price}/month
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePaymentSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name on card</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-number">Card number</Label>
                <div className="flex items-center relative">
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                  <CreditCard className="h-5 w-5 absolute right-3 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="flex space-x-2 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPaymentOpen(false)}
                disabled={processingPayment}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-travel-blue hover:bg-travel-teal"
                disabled={processingPayment}
              >
                {processingPayment ? "Processing..." : "Subscribe Now"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Subscriptions;
