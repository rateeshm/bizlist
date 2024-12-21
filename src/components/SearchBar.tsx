import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 h-5 w-5" />
      <Input
        type="text"
        placeholder="Search local businesses..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 py-6 text-lg bg-transparent border-amber-200 search-input"
      />
    </div>
  );
};

export default SearchBar;