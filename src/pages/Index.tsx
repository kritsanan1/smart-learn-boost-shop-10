import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star, BookOpen, Users, Award, TrendingUp, Filter, Heart, ShoppingCart } from "lucide-react";
import { useBooks } from "@/hooks/useBooks";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { books, loading } = useBooks();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const stats = [
    { icon: BookOpen, label: "หนังสือภาษา", value: "4+" },
    { icon: Users, label: "ลูกค้าพึงพอใจ", value: "10,000+" },
    { icon: Award, label: "คะแนนรีวิว", value: "4.8/5" },
    { icon: TrendingUp, label: "อัตราการเรียนรู้", value: "95%" }
  ];

  const filters = [
    { id: "all", label: "ทั้งหมด" },
    { id: "english", label: "ภาษาอังกฤษ" },
    { id: "korean", label: "ภาษาเกาหลี" },
    { id: "japanese", label: "ภาษาญี่ปุ่น" },
    { id: "chinese", label: "ภาษาจีน" }
  ];

  const filteredBooks = selectedFilter === "all" 
    ? books 
    : books.filter(book => book.language === selectedFilter);

  const formatPrice = (priceInCents: number) => {
    return (priceInCents / 100).toFixed(0);
  };

  const handleAddToCart = async (bookId: string, bookTitle: string) => {
    try {
      await addToCart(bookId);
      toast({
        title: "เพิ่มลงตระกร้าสำเร็จ!",
        description: `${bookTitle} ถูกเพิ่มลงในตระกร้าของคุณแล้ว`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleQuickView = (productTitle: string) => {
    toast({
      title: "กำลังเปิดรายละเอียดสินค้า",
      description: `${productTitle}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary">
              <BookOpen className="h-3 w-3 mr-1" />
              หนังสือแนะนำ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              คอลเลกชันหนังสือ
              <span className="bg-gradient-primary bg-clip-text text-transparent"> ภาษาคุณภาพ</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              เลือกเรียนภาษาที่คุณสนใจ พร้อมเนื้อหาที่เข้าใจง่าย เหมาะสำหรับผู้เริ่มต้น
            </p>
          </div>

          {loading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">กำลังโหลดหนังสือ...</p>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter.id)}
                className="transition-all duration-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredBooks.map((book) => (
              <ProductCard
                key={book.id}
                id={book.id}
                title={book.title}
                description={book.description}
                price={parseInt(formatPrice(book.price))}
                originalPrice={parseInt(formatPrice(book.price + 5000))} // Add 50 THB as original price
                image={book.image_url || '/placeholder.jpg'}
                rating={4.5} // Default rating
                reviewCount={Math.floor(Math.random() * 200) + 50} // Random reviews for demo
                isNew={book.is_new}
                isBestseller={book.is_bestseller}
                stockCount={book.stock_quantity}
                onAddToCart={() => handleAddToCart(book.id, book.title)}
                onQuickView={() => handleQuickView(book.title)}
              />
            ))}
          </div>

          {/* Bundle Offer */}
          <Card className="bg-gradient-hero text-white border-0 shadow-product overflow-hidden relative">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            <CardContent className="p-8 md:p-12 relative">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4 bg-white/20 text-white border-white/30">
                    ⚡ ข้อเสนอพิเศษ
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    ซื้อครบ 4 เล่ม ลด 15%
                  </h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    เรียนรู้ทั้ง 4 ภาษาในราคาพิเศษ! อังกฤษ เกาหลี ญี่ปุ่น และจีน 
                    ปกติ ฿830 เหลือเพียง ฿705
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold">฿705</span>
                    <span className="text-xl text-white/70 line-through">฿830</span>
                    <Badge className="bg-warning text-warning-foreground">
                      ประหยัด ฿125
                    </Badge>
                  </div>
                  <Button variant="secondary" size="lg" className="font-semibold">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    ซื้อเซ็ตสุดคุ้ม
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {books.slice(0, 4).map((book, index) => (
                    <div key={book.id} className={`${index >= 2 ? 'translate-y-4' : ''}`}>
                      <img
                        src={book.image_url || '/placeholder.jpg'}
                        alt={book.title}
                        className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ความคิดเห็นจากลูกค้า</h2>
            <p className="text-muted-foreground">ดูว่าลูกค้าของเราพูดถึงหนังสือเรายังไง</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "น.ส. สุธิดา",
                rating: 5,
                comment: "หนังสือเกาหลีเข้าใจง่ายมาก ภาพประกอบน่ารัก เหมาะกับคนเริ่มต้นจริง ๆ",
                book: "Korean Start"
              },
              {
                name: "นาย วิชัย",
                rating: 5,
                comment: "ไวยากรณ์อังกฤษอธิบายแบบง่าย ๆ ทำให้เข้าใจมากขึ้น แนะนำเลย!",
                book: "English Grammar"
              },
              {
                name: "น.ส. มายุมิ",
                rating: 4,
                comment: "หนังสือญี่ปุ่นดีมาก เนื้อหาครบถ้วน ราคาก็ไม่แพง",
                book: "Japanese Start"
              }
            ].map((review, index) => (
              <Card key={index} className="bg-background border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm mb-4 leading-relaxed">"{review.comment}"</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{review.name}</span>
                    <span className="text-muted-foreground">{review.book}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-primary text-white border-0 shadow-product">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                รับข่าวสารและโปรโมชั่นพิเศษ
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                สมัครรับข่าวสารเพื่อได้รับส่วนลดพิเศษ และข้อมูลหนังสือใหม่ก่อนใครฟรี!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="อีเมลของคุณ"
                  className="bg-white text-black border-0"
                />
                <Button variant="secondary" size="lg">
                  สมัครรับข่าวสาร
                </Button>
              </div>
              <p className="text-white/70 text-sm mt-4">
                เราจะไม่แชร์อีเมลของคุณกับบุคคลที่สาม
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SL</span>
                </div>
                <span className="text-lg font-bold">Smart Learning Center</span>
              </div>
              <p className="text-background/70 text-sm leading-relaxed">
                ร้านหนังสือเรียนภาษาที่มีคุณภาพ 
                เหมาะสำหรับผู้เริ่มต้นในการเรียนรู้ภาษาใหม่
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">หมวดหมู่</h3>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">ภาษาอังกฤษ</a></li>
                <li><a href="#" className="hover:text-background transition-colors">ภาษาเกาหลี</a></li>
                <li><a href="#" className="hover:text-background transition-colors">ภาษาญี่ปุ่น</a></li>
                <li><a href="#" className="hover:text-background transition-colors">ภาษาจีน</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">บริการ</h3>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">การจัดส่ง</a></li>
                <li><a href="#" className="hover:text-background transition-colors">การคืนสินค้า</a></li>
                <li><a href="#" className="hover:text-background transition-colors">สอบถาม</a></li>
                <li><a href="#" className="hover:text-background transition-colors">ติดต่อเรา</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">ติดตาม</h3>
              <p className="text-background/70 text-sm mb-4">
                ติดตามเราบน LINE Shopping
              </p>
              <Button variant="outline" size="sm" className="border-background/30 text-background hover:bg-background/10">
                @946qguvt
              </Button>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/70">
            © 2024 Smart Learning Center. สงวนลิขสิทธิ์ทั้งหมด.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;