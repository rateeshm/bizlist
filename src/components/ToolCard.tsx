import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Bookmark, DollarSign, Clock, Phone, Mail, Globe, Languages } from "lucide-react";
import type { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const getPricingIcons = (pricing: string) => {
    switch (pricing) {
      case "Budget":
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case "Moderate":
        return (
          <div className="flex">
            <DollarSign className="h-4 w-4 text-green-600" />
            <DollarSign className="h-4 w-4 text-green-600" />
          </div>
        );
      case "Premium":
        return (
          <div className="flex">
            <DollarSign className="h-4 w-4 text-green-600" />
            <DollarSign className="h-4 w-4 text-green-600" />
            <DollarSign className="h-4 w-4 text-green-600" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:animate-card-hover">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img src={tool.logo} alt={tool.name} className="w-12 h-12 rounded-lg object-cover" />
          <div>
            <h3 className="font-semibold text-lg">{tool.name}</h3>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(tool.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({tool.reviews})</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-sm text-gray-500">
            <Bookmark className="h-4 w-4 inline mr-1" />
            {tool.bookmarks}
          </span>
          {getPricingIcons(tool.pricing)}
        </div>
      </div>
      
      <p className="mt-4 text-gray-600">{tool.description}</p>
      
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p><Clock className="h-4 w-4 inline mr-2" />{tool.workingHours}</p>
        <p><Phone className="h-4 w-4 inline mr-2" />{tool.phone}</p>
        <p><Mail className="h-4 w-4 inline mr-2" />{tool.email}</p>
        <p><Languages className="h-4 w-4 inline mr-2" />{tool.languages.join(", ")}</p>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {tool.specialties.map((specialty) => (
          <span
            key={specialty}
            className="text-sm px-2 py-1 bg-amber-50 text-amber-600 rounded-full"
          >
            {specialty}
          </span>
        ))}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="mt-6 flex gap-3">
        <Button
          variant="default"
          className="flex-1"
          onClick={() => window.open(tool.visitUrl, "_blank")}
        >
          Visit Website
        </Button>
        {tool.dealUrl && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open(tool.dealUrl, "_blank")}
          >
            Special Offer
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ToolCard;