import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, QrCode } from 'lucide-react';

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const adminStatus = sessionStorage.getItem('bf_admin');
    setIsAdmin(!!adminStatus);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdf6e3] to-[#fef8ec] flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-[#3d2817] mb-4">Product Not Found</h2>
            <Button onClick={() => navigate('/')} className="bg-[#a56c43] hover:bg-[#8d5a38]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleGenerateQR = () => {
    navigate(`/qr?product=${product.slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6e3] via-[#fef8ec] to-[#fcf4e8]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[#a56c43]/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-[#a56c43] hover:text-[#8d5a38] hover:bg-[#fdf6e3]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </header>

      {/* Product Details */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-[#3d2817] mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-[#a56c43]">₹{product.mrp}</span>
                <Badge variant="secondary" className="bg-[#fdf6e3] text-[#3d2817] border border-[#a56c43]/30">
                  {product.weight}
                </Badge>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details Card */}
            <Card className="border-2 border-[#a56c43]/20">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg text-[#3d2817] border-b border-[#a56c43]/20 pb-2">Product Information</h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-medium">FSSAI License</p>
                    <p className="text-[#3d2817] font-semibold">{product.fssai}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Weight</p>
                    <p className="text-[#3d2817] font-semibold">{product.weight}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Manufacturing Date</p>
                    <p className="text-[#3d2817] font-semibold">{product.mfg}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Expiry Date</p>
                    <p className="text-[#3d2817] font-semibold">{product.exp}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 font-medium mb-2">Ingredients</p>
                  <p className="text-[#3d2817] text-sm leading-relaxed">{product.ingredients}</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Button - Only for Admin */}
            {isAdmin && (
              <Button
                onClick={handleGenerateQR}
                className="w-full bg-[#a56c43] hover:bg-[#8d5a38] text-white py-6 text-lg"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Generate QR Label
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;