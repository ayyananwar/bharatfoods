import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Cake, LogIn } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6e3] via-[#fef8ec] to-[#fcf4e8]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[#a56c43]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cake className="w-8 h-8 text-[#a56c43]" />
              <h1 className="text-3xl font-bold text-[#3d2817]">Bharat Foods</h1>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 px-3 py-2 bg-[#a56c43] text-white rounded-lg hover:bg-[#8b5632] transition-colors text-sm font-medium"
            >
              <LogIn className="w-4 h-4" />
              Admin
            </button>
          </div>
          <p className="text-gray-600 mt-2">Premium bakery products, freshly made with love</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#3d2817] mb-2">Our Products</h2>
          <p className="text-gray-600">Handcrafted delicacies from our kitchen to yours</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-[#a56c43]/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2025 Bharat Foods. All rights reserved.</p>
          <p className="text-sm mt-2">FSSAI: 117001000448</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;