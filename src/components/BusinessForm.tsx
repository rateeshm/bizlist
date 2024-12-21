import { useForm } from "react-hook-form";
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { categories } from "@/data/tools";

interface BusinessFormData {
  name: string;
  description: string;
  category: string;
  phone: string;
  email: string;
  address: string;
  working_hours: string;
  pricing: "Budget" | "Moderate" | "Premium";
  languages: string[];
}

const BusinessForm = () => {
  const session = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<BusinessFormData>();

  useEffect(() => {
    const loadBusinessData = async () => {
      if (session?.user?.id) {
        const { data: business } = await supabase
          .from('businesses')
          .select('*')
          .eq('owner_id', session.user.id)
          .single();

        if (business) {
          // Ensure pricing is one of the allowed values
          const formattedBusiness = {
            ...business,
            pricing: (business.pricing as "Budget" | "Moderate" | "Premium") || "Moderate",
            languages: business.languages || []
          };
          reset(formattedBusiness);
        }
      }
      setLoading(false);
    };

    loadBusinessData();
  }, [session, reset]);

  const onSubmit = async (data: BusinessFormData) => {
    try {
      if (!session?.user?.id) return;

      const { data: existingBusiness } = await supabase
        .from('businesses')
        .select('id')
        .eq('owner_id', session.user.id)
        .single();

      if (existingBusiness) {
        await supabase
          .from('businesses')
          .update(data)
          .eq('id', existingBusiness.id);
      } else {
        await supabase
          .from('businesses')
          .insert([{ ...data, owner_id: session.user.id }]);
      }

      toast({
        title: "Success",
        description: "Business information saved successfully.",
      });
    } catch (error) {
      console.error('Error saving business:', error);
      toast({
        title: "Error",
        description: "Failed to save business information.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-amber-900">Business Name</label>
        <Input {...register("name")} className="mt-1" />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Description</label>
        <Textarea {...register("description")} className="mt-1" />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Category</label>
        <select {...register("category")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Phone</label>
        <Input {...register("phone")} className="mt-1" />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Email</label>
        <Input {...register("email")} type="email" className="mt-1" />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Address</label>
        <Input {...register("address")} className="mt-1" />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Working Hours</label>
        <Input {...register("working_hours")} className="mt-1" placeholder="e.g., Mon-Fri 9AM-5PM" />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Pricing Category</label>
        <select {...register("pricing")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="Budget">Budget</option>
          <option value="Moderate">Moderate</option>
          <option value="Premium">Premium</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Languages (comma-separated)</label>
        <Input {...register("languages")} className="mt-1" placeholder="English, Arabic" />
      </div>

      <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
        Save Business Information
      </Button>
    </form>
  );
};

export default BusinessForm;