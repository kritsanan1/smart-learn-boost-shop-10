import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  description: string;
  isNew?: boolean;
  isBestseller?: boolean;
  stockCount?: number;
  onAddToCart?: () => void;
  onQuickView?: () => void;
}

export const ProductCard = ({
  id,
  title,
  price,
  originalPrice,
  image,
  rating = 4.8,
  reviewCount = 0,
  description,
  isNew = false,
  isBestseller = false,
  stockCount,
  onAddToCart,
  onQuickView,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => `฿${price.toLocaleString()}`;
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const isLowStock = stockCount && stockCount <= 10;

  return (
    <Card 
      className="group relative overflow-hidden border-0 shadow-card hover:shadow-product transition-all duration-300 hover:-translate-y-1 bg-gradient-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <Badge className="bg-success text-success-foreground">
            ใหม่
          </Badge>
        )}
        {isBestseller && (
          <Badge className="bg-warning text-warning-foreground">
            <Zap className="h-3 w-3 mr-1" />
            ขายดี
          </Badge>
        )}
        {discountPercentage > 0 && (
          <Badge className="bg-destructive text-destructive-foreground">
            -{discountPercentage}%
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm transition-all duration-300 ${
          isWishlisted ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
        } ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        onClick={() => setIsWishlisted(!isWishlisted)}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </Button>

      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick View Overlay */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="outline"
            size="sm"
            className="bg-background/90 backdrop-blur-sm border-white/20"
            onClick={onQuickView}
          >
            <Eye className="h-4 w-4 mr-2" />
            ดูรายละเอียด
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Rating */}
        {reviewCount > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({reviewCount})
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>

        {/* Stock Info */}
        {isLowStock && (
          <div className="flex items-center gap-1 mb-2">
            <div className="h-2 w-2 rounded-full bg-warning animate-pulse" />
            <span className="text-xs text-warning font-medium">
              เหลือเพียง {stockCount} เล่ม!
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="cta"
          className="w-full"
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          เพิ่มลงตะกร้า
        </Button>
      </CardFooter>

      {/* Notification badge for recent purchases */}
      {Math.random() > 0.7 && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-success/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md animate-pulse">
            มีคนซื้อ 3 คนในวันนี้
          </div>
        </div>
      )}
    </Card>
  );
};