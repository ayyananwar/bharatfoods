import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { QrCode, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const adminStatus = sessionStorage.getItem('bf_admin');
    setIsAdmin(!!adminStatus);
  }, []);

  const handleGenerateQR = () => {
    navigate(`/qr?product=${product.slug}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-[#a56c43]/20">
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-[#fdf6e3] to-[#f5e6d3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-[#3d2817] mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-bold text-[#a56c43]">₹{product.mrp}</span>
          <span className="text-sm text-gray-600">{product.weight}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={() => navigate(`/product/${product.slug}`)}
          className={`${isAdmin ? 'flex-1' : 'w-full'} bg-[#a56c43] hover:bg-[#8d5a38] text-white transition-colors`}
        >
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
        {isAdmin && (
          <Button
            onClick={handleGenerateQR}
            variant="outline"
            className="flex-1 border-[#a56c43] text-[#a56c43] hover:bg-[#a56c43] hover:text-white transition-colors"
          >
            <QrCode className="w-4 h-4 mr-2" />
            QR Label
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;