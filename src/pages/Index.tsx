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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16 animate-fade-in">
          <div className="flex items-center gap-6">
            <img 
              src="/lovable-uploads/1979f394-4ab2-4d92-a9ac-25ecaab00186.png" 
              alt="Arabian Trade Hub Logo" 
              className="w-16 h-16"
            />
            <div>
              <h1 className="text-5xl font-bold text-amber-900 mb-4">Arabian Trade Hub</h1>
              <p className="text-xl text-amber-700">
                Connect with authentic Arabian businesses and traders in your local area
              </p>
            </div>
          </div>
          <Link to="/login">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Login / Register
            </Button>
          </Link>
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
  );
};

export default Index;