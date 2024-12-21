import { Button } from "@/components/ui/button";
import { categories } from "@/data/tools";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-amber-900 mb-6">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "ghost"}
              className={`w-full justify-start text-left category-button ${
                selectedCategory === category.name 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'text-amber-900'
              }`}
              onClick={() => onSelectCategory(category.name)}
            >
              <Icon className="mr-2 h-5 w-5" />
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;