import { useState } from "react";
import { ShoppingCart, Search, Menu, X, Heart, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

export const Header = () => {
  const { user, signOut } = useAuth();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">SL</span>
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Smart Learning Center
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            หน้าแรก
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            หนังสือภาษา
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            เกี่ยวกับเรา
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            ติดต่อ
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ค้นหาหนังสือ..."
              className="pl-9 pr-4"
            />
          </div>
          
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground hidden lg:block">
                {user.user_metadata?.full_name || user.email}
              </span>
              <Button variant="ghost" size="icon" onClick={signOut} title="ออกจากระบบ">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="icon" title="เข้าสู่ระบบ">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-warning text-xs">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="ค้นหาหนังสือ..."
                className="pl-9 pr-4"
              />
            </div>
            
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                หน้าแรก
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                หนังสือภาษา
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                เกี่ยวกับเรา
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                ติดต่อ
              </a>
            </nav>

            <div className="flex items-center space-x-4 pt-4 border-t">
              <Button variant="ghost" size="sm" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                รายการโปรด
              </Button>
              
              {user ? (
                <Button variant="ghost" size="sm" className="flex-1" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  ออกจากระบบ
                </Button>
              ) : (
                <Link to="/auth" className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    เข้าสู่ระบบ
                  </Button>
                </Link>
              )}
              
              <Button variant="ghost" size="sm" className="relative flex-1">
                <ShoppingCart className="h-4 w-4 mr-2" />
                ตระกร้า
                {getTotalItems() > 0 && (
                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-warning text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};