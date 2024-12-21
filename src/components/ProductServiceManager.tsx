import { useState, useEffect } from "react";
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

const ProductServiceManager = () => {
  const session = useSession();
  const { toast } = useToast();
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBusinessData = async () => {
      if (session?.user?.id) {
        const { data: business } = await supabase
          .from('businesses')
          .select('id')
          .eq('owner_id', session.user.id)
          .single();

        if (business) {
          setBusinessId(business.id);
          await loadProducts(business.id);
          await loadServices(business.id);
        }
      }
      setLoading(false);
    };

    loadBusinessData();
  }, [session]);

  const loadProducts = async (busId: string) => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('business_id', busId);
    setProducts(data || []);
  };

  const loadServices = async (busId: string) => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('business_id', busId);
    setServices(data || []);
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!businessId) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const product = {
      business_id: businessId,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
    };

    const { error } = await supabase.from('products').insert([product]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add product.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Product added successfully.",
      });
      form.reset();
      await loadProducts(businessId);
    }
  };

  const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!businessId) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const service = {
      business_id: businessId,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      duration: formData.get('duration') as string,
    };

    const { error } = await supabase.from('services').insert([service]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add service.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Service added successfully.",
      });
      form.reset();
      await loadServices(businessId);
    }
  };

  const handleDelete = async (type: 'product' | 'service', id: string) => {
    const { error } = await supabase.from(type === 'product' ? 'products' : 'services')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: `Failed to delete ${type}.`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `${type} deleted successfully.`,
      });
      if (type === 'product') {
        await loadProducts(businessId!);
      } else {
        await loadServices(businessId!);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!businessId) {
    return (
      <div className="text-center p-6">
        <p className="text-amber-900 mb-4">Please create a business profile first.</p>
        <Button onClick={() => window.location.href = '/dashboard/business'}>
          Create Business Profile
        </Button>
      </div>
    );
  }

  return (
    <Tabs defaultValue="products" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
      </TabsList>

      <TabsContent value="products" className="space-y-6">
        <form onSubmit={handleAddProduct} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-amber-900">Add New Product</h3>
          <Input name="name" placeholder="Product Name" required />
          <Textarea name="description" placeholder="Description" />
          <Input name="price" type="number" step="0.01" placeholder="Price" required />
          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-amber-900">{product.name}</h4>
                  <p className="text-sm text-amber-700">{product.description}</p>
                  <p className="text-sm font-semibold text-amber-900">${product.price}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete('product', product.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="services" className="space-y-6">
        <form onSubmit={handleAddService} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-amber-900">Add New Service</h3>
          <Input name="name" placeholder="Service Name" required />
          <Textarea name="description" placeholder="Description" />
          <Input name="price" type="number" step="0.01" placeholder="Price" required />
          <Input name="duration" placeholder="Duration (e.g., 1 hour)" required />
          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-amber-900">{service.name}</h4>
                  <p className="text-sm text-amber-700">{service.description}</p>
                  <p className="text-sm font-semibold text-amber-900">${service.price}</p>
                  <p className="text-sm text-amber-700">{service.duration}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete('service', service.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductServiceManager;