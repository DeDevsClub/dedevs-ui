import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — DeDevs UI",
  description: "Choose the perfect plan for your component generation needs. Start free or upgrade to Pro for unlimited AI-powered component generation.",
  keywords: "pricing, subscription, pro plan, ai components, unlimited generation, dedevs ui",
};

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <Badge variant="outline" className="mb-4">
          <Sparkles className="w-4 h-4 mr-1" />
          Pricing Plans
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Choose Your Plan
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start generating components for free, or upgrade to Pro for unlimited access to our AI-powered component generator.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <Card className="relative">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl">Free</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-muted-foreground mt-2">
              Perfect for trying out our AI component generator
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>3 AI component generations per month</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Access to component preview</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Download generated components</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Basic component library access</span>
              </li>
            </ul>
            <Link href="/degen" className="block">
              <Button variant="outline" className="w-full">
                Get Started Free
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="relative border-primary shadow-lg">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
              <Crown className="w-4 h-4 mr-1" />
              Most Popular
            </Badge>
          </div>
          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="text-2xl">Pro</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">$19</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-muted-foreground mt-2">
              Unlimited component generation for professionals
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="font-medium">Unlimited AI component generations</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Advanced component customization</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Full component library access</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Export to multiple frameworks</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Team collaboration features</span>
              </li>
            </ul>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          <div>
            <h3 className="font-semibold mb-2">What happens when I reach the free limit?</h3>
            <p className="text-muted-foreground">
              Once you've used your 3 free generations, you'll need to upgrade to Pro to continue generating components. Your existing components remain accessible.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I cancel my Pro subscription anytime?</h3>
            <p className="text-muted-foreground">
              Yes, you can cancel your Pro subscription at any time. You'll continue to have Pro access until the end of your billing period.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
            <p className="text-muted-foreground">
              We offer a 30-day money-back guarantee for all Pro subscriptions. Contact support if you're not satisfied.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards and PayPal through our secure payment processor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
