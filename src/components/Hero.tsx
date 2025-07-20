import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Award, Zap } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner}
          alt="Smart Learning Center Hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <div className="space-y-2">
              <Badge className="bg-secondary/90 text-secondary-foreground backdrop-blur-sm">
                <Award className="h-3 w-3 mr-1" />
                ร้านหนังสือคุณภาพ
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                เรียนรู้ภาษาใหม่
                <br />
                <span className="bg-gradient-secondary bg-clip-text text-transparent">
                  ได้ง่ายขึ้น
                </span>
              </h1>
            </div>

            <p className="text-lg text-white/90 max-w-md leading-relaxed">
              คอลเลกชันหนังสือเรียนภาษาคุณภาพสูง เหมาะสำหรับผู้เริ่มต้น 
              พร้อมภาพประกอบน่ารักและคำอธิบายที่เข้าใจง่าย
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 py-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-secondary" />
                <span className="text-sm">หนังสือ 4 ภาษา</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                <span className="text-sm">นักเรียน 10,000+ คน</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-secondary" />
                <span className="text-sm">เรียนรู้ได้ง่าย</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="hero" 
                size="lg"
                className="group"
              >
                <BookOpen className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                เลือกซื้อหนังสือ
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                เรียนรู้เพิ่มเติม
              </Button>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="grid grid-cols-2 gap-4 animate-slide-up">
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-2">ภาษาอังกฤษ</h3>
                <p className="text-white/80 text-sm">ไวยากรณ์แบบง่าย ๆ</p>
                <div className="mt-3 text-secondary font-bold">฿250</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-2">ภาษาญี่ปุ่น</h3>
                <p className="text-white/80 text-sm">เริ่มต้นฝึกพื้นฐาน</p>
                <div className="mt-3 text-secondary font-bold">฿190</div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-2">ภาษาเกาหลี</h3>
                <p className="text-white/80 text-sm">พื้นฐานการออกเสียง</p>
                <div className="mt-3 text-secondary font-bold">฿190</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-2">ภาษาจีน</h3>
                <p className="text-white/80 text-sm">ตัวอักษรและการออกเสียง</p>
                <div className="mt-3 text-secondary font-bold">฿190</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse hidden lg:block" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse hidden lg:block" />
    </section>
  );
};