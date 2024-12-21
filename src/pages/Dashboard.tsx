import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import BusinessForm from '@/components/BusinessForm';
import ProductServiceManager from '@/components/ProductServiceManager';
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/dashboard" className="flex items-center px-4 text-amber-900 font-semibold">
                Dashboard
              </Link>
              <Link to="/dashboard/business" className="flex items-center px-4 text-amber-900">
                My Business
              </Link>
              <Link to="/dashboard/products-services" className="flex items-center px-4 text-amber-900">
                Products & Services
              </Link>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="text-amber-900"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="business" element={<BusinessForm />} />
          <Route path="products-services" element={<ProductServiceManager />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold text-amber-900 mb-4">Welcome to Your Dashboard</h2>
    <p className="text-amber-800 mb-6">
      Manage your business profile, products, and services from here.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link
        to="/dashboard/business"
        className="p-4 border rounded-lg hover:bg-amber-50 transition-colors"
      >
        <h3 className="font-semibold text-amber-900">Business Profile</h3>
        <p className="text-amber-700">Update your business information</p>
      </Link>
      <Link
        to="/dashboard/products-services"
        className="p-4 border rounded-lg hover:bg-amber-50 transition-colors"
      >
        <h3 className="font-semibold text-amber-900">Products & Services</h3>
        <p className="text-amber-700">Manage your offerings</p>
      </Link>
    </div>
  </div>
);

export default Dashboard;