import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import QRLabel from '../components/QRLabel';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, LogOut } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const QRGenerator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Check admin authentication
    const isAdmin = sessionStorage.getItem('bf_admin');
    if (!isAdmin) {
      navigate('/admin', { state: { redirectTo: window.location.pathname + window.location.search } });
      return;
    }

    // Set initial product from URL parameter
    const productSlug = searchParams.get('product');
    if (productSlug) {
      const product = products.find(p => p.slug === productSlug);
      if (product) {
        setSelectedProduct(product);
      }
    } else if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, [navigate, searchParams]);

  const handleLogout = () => {
    sessionStorage.removeItem('bf_admin');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const handleProductChange = (slug) => {
    const product = products.find(p => p.slug === slug);
    setSelectedProduct(product);
  };

  if (!selectedProduct) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6e3] via-[#fef8ec] to-[#fcf4e8]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[#a56c43]/20 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-[#a56c43] hover:text-[#8d5a38] hover:bg-[#fdf6e3]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#a56c43] text-[#a56c43] hover:bg-[#a56c43] hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#3d2817] mb-2">QR Label Generator</h1>
          <p className="text-gray-600">Select a product and print its QR label</p>
        </div>

        {/* Product Selector */}
        <Card className="mb-8 border-2 border-[#a56c43]/20 print:hidden">
          <CardContent className="p-6">
            <label className="block text-sm font-medium text-[#3d2817] mb-2">
              Select Product
            </label>
            <Select value={selectedProduct.slug} onValueChange={handleProductChange}>
              <SelectTrigger className="w-full border-[#a56c43]/30 focus:border-[#a56c43] focus:ring-[#a56c43]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {products.map(product => (
                  <SelectItem key={product.id} value={product.slug}>
                    {product.name} - ₹{product.mrp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* QR Label Component */}
        <QRLabel product={selectedProduct} />
      </main>
    </div>
  );
};

export default QRGenerator;