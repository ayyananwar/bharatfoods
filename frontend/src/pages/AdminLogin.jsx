import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Lock, ArrowLeft } from 'lucide-react';
import { toast } from '../hooks/use-toast';

// ADMIN PASSWORD - Change here if needed
const ADMIN_PASSWORD = 'YourSecurePassword123';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/qr';

  useEffect(() => {
    // If already logged in, redirect to QR page
    const isAdmin = sessionStorage.getItem('bf_admin');
    if (isAdmin) {
      navigate(redirectTo);
    }
  }, [navigate, redirectTo]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a brief loading state
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('bf_admin', '1');
        toast({
          title: "Login Successful",
          description: "Welcome, Admin!",
        });
        navigate(redirectTo);
      } else {
        toast({
          title: "Login Failed",
          description: "Incorrect password. Please try again.",
          variant: "destructive",
        });
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6e3] via-[#fef8ec] to-[#fcf4e8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-4 text-[#a56c43] hover:text-[#8d5a38] hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Login Card */}
        <Card className="border-2 border-[#a56c43]/20 shadow-2xl">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#fdf6e3] flex items-center justify-center border-2 border-[#a56c43]/30">
              <Lock className="w-8 h-8 text-[#a56c43]" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#3d2817]">Admin Access</CardTitle>
            <CardDescription className="text-gray-600">
              Please sign in to generate and print QR labels
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#3d2817] font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[#a56c43]/30 focus:border-[#a56c43] focus:ring-[#a56c43]"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="bg-[#fdf6e3] border border-[#a56c43]/20 rounded-lg p-3 text-sm text-gray-700">
                <p className="font-medium text-[#3d2817] mb-1">Session Info:</p>
                <p>Your admin session will persist during this browser tab session.</p>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-[#a56c43] hover:bg-[#8d5a38] text-white py-6"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;