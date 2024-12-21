import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredTools = filteredTools.filter(tool => tool.featured);
  const regularTools = filteredTools.filter(tool => !tool.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-8">
                <img 
                  src="/lovable-uploads/4bcaf807-79e3-46c8-89aa-e35a867a2259.png" 
                  alt="Arabian Trade Hub Logo" 
                  className="w-48 h-48"
                />
                <div className="flex flex-col">
                  <h1 className="text-5xl font-bold text-amber-900 mb-4">Arabian Trade Hub</h1>
                  <p className="text-xl text-amber-700">
                    YOUR GATEWAY TO ARABIAN COMMERCE
                  </p>
                </div>
              </div>
              <Link to="/login" className="absolute top-8 right-8">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Login / Register
                </Button>
              </Link>
            </div>
            <div className="mt-8">
              <p className="text-lg text-gray-700">
                Welcome to Arabian Trade Hub – your premier destination for Arabian commerce! Our platform connects authentic businesses with customers, streamlining trade across the Arabian market. With features like detailed business profiles, product showcases, and seamless communication channels, you'll always stay connected with the vibrant Arabian business community. Whether you're discovering local traders, exploring unique products, or expanding your business reach, Arabian Trade Hub has you covered. Join us today and experience Arabian commerce redefined!
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="sticky top-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-fade-in">
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
            </aside>
            
            <main className="lg:col-span-3 space-y-8 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            
            {featuredTools.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-amber-900 pl-4 border-l-4 border-amber-500">
                  Featured Businesses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-amber-900 pl-4 border-l-4 border-amber-500">
                All Businesses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
              
              {filteredTools.length === 0 && (
                <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl">
                  <p className="text-amber-700 text-lg">No businesses found matching your criteria.</p>
                </div>
              )}
            </div>
            </main>
          </div>
        </div>
      </div>

      <footer className="bg-amber-50 border-t border-amber-100 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Contact Us</h3>
              <ul className="space-y-2 text-amber-700">
                <li>Email: contact@arabiantradehub.com</li>
                <li>Phone: +971 4 123 4567</li>
                <li>Address: Dubai Business Bay, UAE</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Business Hours</h3>
              <ul className="space-y-2 text-amber-700">
                <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                <li>Saturday: 10:00 AM - 4:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Follow Us</h3>
              <ul className="space-y-2 text-amber-700">
                <li>LinkedIn: Arabian Trade Hub</li>
                <li>Twitter: @ArabianTradeHub</li>
                <li>Instagram: @arabiantradehub</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-amber-200 text-center text-amber-600">
            <p>&copy; 2024 Arabian Trade Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;