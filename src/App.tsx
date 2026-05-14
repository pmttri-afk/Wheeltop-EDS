/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Cpu, 
  Settings, 
  Tool, 
  MessageCircle, 
  Phone, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Globe,
  Truck,
  ArrowRight
} from 'lucide-react';

// --- Constants & Data ---
const CONTACT_PHONE = "0906224748";
const ZALO_LINK = "https://zalo.me/0906224748";

const NAV_LINKS = [
  { name: 'Sản phẩm', href: '#features' },
  { name: 'Tại sao chọn Trioneer', href: '#trust' },
  { name: 'Đánh giá', href: '#feedback' },
  { name: 'Câu hỏi thường gặp', href: '#faq' },
];

const FEATURES = [
  {
    title: "Sang số điện tử chính xác",
    description: "Công nghệ EDS không dây giúp chuyển líp tức thì, mượt mà dưới mọi tải trọng.",
    icon: <Cpu className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Tùy biến đa dạng",
    description: "Hỗ trợ các hệ thống 10, 11, và 12 tốc độ thông qua ứng dụng di động Wheeltop.",
    icon: <Settings className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Pin bền bỉ",
    description: "Hệ thống pin tích hợp cho phép hoạt động liên tục lên đến hàng ngàn lần sang số.",
    icon: <Zap className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Chống nước IP67",
    description: "Hoạt động hoàn hảo trong điều kiện thời tiết khắc nghiệt, bùn lầy hay mưa lớn.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-400" />
  }
];

const COMPARISON = {
  risks: [
    "Không có bảo hành chính hãng",
    "Không có linh kiện thay thế khi hỏng",
    "Thiếu kỹ thuật hỗ trợ chuyên sâu",
    "Rủi ro hàng giả, hàng kém chất lượng",
    "Mất tiền oan nếu gặp lỗi sản xuất"
  ],
  benefits: [
    "Bảo hành 1 đổi 1 tiêu chuẩn hãng",
    "Kho linh kiện thay thế luôn sẵn sàng",
    "Kỹ thuật viên được đào tạo từ Wheeltop",
    "Cam kết hàng nhập chính ngạch 100%",
    "An tâm tuyệt đối cho khoản đầu tư của bạn"
  ]
};

const FAQS = [
  {
    question: "Wheeltop EDS có tương thích với xe của tôi không?",
    answer: "Wheeltop EDS được thiết kế cực kỳ linh hoạt, hỗ trợ hầu hết các khung sườn Road/TT hiện nay và có thể cấu hình từ 10-12 tốc độ."
  },
  {
    question: "Ưu điểm của Wheeltop EDS so với Shimano Di2 hay SRAM eTap là gì?",
    answer: "Wheeltop EDS mang lại tỷ lệ hiệu năng trên giá thành cực tốt (chỉ bằng 1/3 giá các hãng đối thủ) nhưng vẫn sở hữu công nghệ không dây hoàn toàn. Ngoài ra, EDS cho phép tùy biến số tốc độ (từ 7 đến 13 speed) linh hoạt ngay trên ứng dụng điện thoại, điều mà các hãng lớn thường giới hạn trong hệ sinh thái của họ."
  },
  {
    question: "Pin của Wheeltop EDS dùng được bao lâu cho một lần sạc?",
    answer: "Hệ thống pin tích hợp cho phép thực hiện hơn 20,000 lần sang số cho một lần sạc đầy (tương đương khoảng 1,000 - 1,500km đạp xe thực tế). EDS sử dụng công nghệ sạc từ tính tiện lợi, giúp sạc đầy pin chỉ trong vòng 2 giờ mà không cần tháo rời linh kiện."
  },
  {
    question: "Wheeltop EDS có hoạt động ổn định như các hãng lớn lâu đời không?",
    answer: "Hoàn toàn ổn định. Wheeltop EDS đạt chuẩn chống nước và bụi IP67, hoạt động tốt trong mọi điều kiện thời tiết khắc nghiệt. Sản phẩm được chế tác từ hợp kim nhôm hoặc Carbon cao cấp, đi kèm chính sách bảo hành 1 đổi 1 chính hãng tại Trioneer, mang lại sự an tâm tuyệt đối không thua kém bất kỳ đối thủ nào."
  },
  {
    question: "Chính sách bảo hành tại Trioneer như thế nào?",
    answer: "Chúng tôi áp dụng chính sách bảo hành chính hãng từ nhà sản xuất, hỗ trợ xử lý kỹ thuật tại Việt Nam giúp khách hàng tiết kiệm thời gian."
  },
  {
    question: "Lắp đặt có khó không?",
    answer: "Hệ thống EDS không dây nên lắp đặt cực kỳ đơn giản. Tuy nhiên, Trioneer khuyến khích khách hàng đến cửa hàng để được kỹ thuật viên cân chỉnh hoàn hảo nhất."
  }
];

// --- Sub-Components ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold mb-4 text-slate-900"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-slate-600 max-w-2xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism py-4">
    <div className="container mx-auto px-6 flex justify-between items-center">
      <div className="flex items-center gap-2 group cursor-pointer">
        <img src="/logo.png" alt="Trioneer Cycling Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
        <span className="font-display font-bold text-xl tracking-tighter text-slate-900">TRIONEER <span className="text-blue-600">CYCLING</span></span>
      </div>
      <div className="hidden md:flex gap-8 items-center">
        {NAV_LINKS.map(link => (
          <a key={link.name} href={link.href} className="text-sm font-medium hover:text-blue-400 transition-colors">{link.name}</a>
        ))}
      </div>
      <a 
        href={ZALO_LINK}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95"
      >
        Liên hệ Zalo
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-white">
    {/* Background Decorations */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 blur-[120px] rounded-full -translate-y-1/2"></div>
    <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-emerald-50/50 blur-[100px] rounded-full translate-y-1/2"></div>

    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-600 text-xs font-bold mb-6 uppercase tracking-widest">
          <Globe className="w-3 h-3" /> Nhà phân phối chính hãng Việt Nam
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-slate-900">
          Nâng Cấp <span className="text-gradient">Đẳng Cấp</span> <br />
          Wheeltop EDS TX
        </h1>
        <p className="text-slate-600 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
          Trải nghiệm sang số điện tử không dây mượt mà, chính xác. <span className="text-blue-600 font-bold">Hàng chính hãng, nhập chính ngạch 100%</span> với đầy đủ hóa đơn và chính sách bảo hành quốc tế tại Việt Nam.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#order"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 group"
          >
            Đặt hàng ngay <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href={ZALO_LINK}
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-blue-500" /> Nhận báo giá
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent z-10 md:hidden"></div>
        <img 
          src="https://wheeltop.com/cdn/shop/files/TX7800-daily.jpg?v=1766736267" 
          alt="Wheeltop EDS TX" 
          className="w-full h-auto rounded-3xl shadow-2xl shadow-blue-200/50 animate-float"
        />
        <div className="absolute -bottom-6 -left-6 md:bottom-20 md:-left-12 glass-morphism p-6 rounded-2xl shadow-xl z-20">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Sản phẩm uy tín</p>
              <p className="font-bold text-lg text-slate-900">Chính Ngạch 100%</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const TrustPoints = () => (
  <div className="bg-slate-50 border-y border-slate-100 py-8">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
        {[
          { icon: <ShieldCheck className="w-5 h-5" />, text: "Hàng chính hãng 100%" },
          { icon: <Globe className="w-5 h-5" />, text: "Nhập khẩu chính ngạch" },
          { icon: <Truck className="w-5 h-5" />, text: "Giao hàng toàn quốc" },
          { icon: <Settings className="w-5 h-5" />, text: "Bảo hành 1 đổi 1" },
        ].map((pt, i) => (
          <div key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm uppercase tracking-wider">
            <div className="text-blue-600">{pt.icon}</div>
            {pt.text}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const VideoShowcase = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-100 group">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://wheeltop.com/cdn/shop/videos/c/vp/89484182a2f24c3ea034182c2c62386a/89484182a2f24c3ea034182c2c62386a.HD-720p-1.6Mbps-23774321.mp4?v=0" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tighter">Trải nghiệm vận hành mượt mà</h3>
            <p className="text-white/80 max-w-xl text-lg hidden md:block">
              Chứng kiến công nghệ sang số không dây EDS TX trong thực tế - Phản hồi tức thì, độ chính xác tuyệt đối ngay cả trong những điều kiện khắc nghiệt nhất.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const PromoOffer = () => (
  <section className="relative py-32 bg-slate-950 text-white overflow-hidden">
    {/* Background Image with Blur and Dark Overlay */}
    <div 
      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
      style={{ 
        backgroundImage: `url('https://wheeltop.com/cdn/shop/files/TX7800-daily.jpg?v=1766736267')`,
        filter: 'brightness(0.3) blur(4px)'
      }}
    ></div>
    
    <div className="container mx-auto px-6 relative z-10 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="inline-block bg-blue-600/20 backdrop-blur-md border border-blue-500/30 px-6 py-2 rounded-full text-blue-400 font-black text-sm uppercase tracking-[0.3em] mb-8 animate-pulse">
          CAM KẾT CHÍNH HÃNG - NHẬP CHÍNH NGẠCH
        </div>
        <h2 className="text-4xl md:text-7xl font-black mb-8 text-white uppercase italic tracking-tighter drop-shadow-2xl leading-[1.1]">
          🔥 GIÁ SỐC CHƯA TỪNG CÓ 🔥 <br/>
          <span className="text-2xl md:text-4xl line-through text-slate-500 decoration-red-600 decoration-2 md:decoration-4 opacity-80 mr-4">16.500.000đ</span>
          <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">14.500.000đ</span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed font-medium drop-shadow-md">
          Cơ hội <span className="text-white font-bold underline decoration-blue-500">TIẾT KIỆM NGAY 2 TRIÊU ĐỒNG</span> khi nâng cấp bộ truyền động <br className="hidden md:block" />
          <span className="text-white font-black uppercase">Wheeltop EDS TX</span> (Phiên bản Nhôm) <br className="hidden md:block" />
          + Tặng kèm <span className="text-blue-400 font-bold uppercase">Áo Jersey cao cấp Trioneer trị giá 990k (Số lượng có hạn)</span>.
        </p>
        <div className="inline-flex flex-col items-center gap-4">
          <a 
            href="#order"
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-full font-black text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-blue-600/50"
          >
            NHẬN ƯU ĐÃI NGAY
          </a>
          <p className="text-blue-400 font-bold animate-pulse text-lg tracking-widest uppercase">Hàng mới cập bến - Đừng bỏ lỡ!</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const PainPoints = () => (
  <section className="py-24 bg-surface-800">
    <div className="container mx-auto px-6">
      <SectionTitle subtitle="Đừng để sự thiếu hụt dịch vụ sau bán hàng làm hỏng trải nghiệm đạp xe của bạn.">
        SỰ KHÁC BIỆT KHI MUA <span className="text-blue-600">CHÍNH HÃNG</span>
      </SectionTitle>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Risks */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-red-50 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Hàng Trôi Nổi (Xách Tay)</h3>
          </div>
          <ul className="space-y-6">
            {COMPARISON.risks.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                 <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-1">
                   <span className="text-red-500 font-bold block leading-none text-xs">×</span>
                </div>
                <span className="text-slate-600 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Benefits */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white border-2 border-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <ShieldCheck className="w-32 h-32 text-blue-600" />
          </div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-blue-600">Chính Hãng Trioneer</h3>
          </div>
          <ul className="space-y-6 relative z-10">
            {COMPARISON.benefits.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <span className="text-slate-900 text-lg font-bold">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

const ProductShowcase = () => (
  <section id="features" className="py-24 overflow-hidden bg-white">
    <div className="container mx-auto px-6">
      <div className="mb-20">
        <SectionTitle subtitle="Cận cảnh bộ truyền động Wheeltop EDS TX - Sự kết hợp hoàn hảo giữa cơ khí chính xác và công nghệ điện tử.">
          CHI TIẾT <span className="text-blue-600">SẢN PHẨM</span>
        </SectionTitle>
        
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { 
              url: "https://wheeltop.com/cdn/shop/files/3_bcfa9fca-65e9-4deb-a73b-dae58eed614a.png?v=1708912276",
              title: "Tay Lắc & Ngàm Phanh",
              desc: "Thiết kế Ergonomic tối ưu, cầm nắm chắc chắn."
            },
            { 
              url: "https://wheeltop.com/cdn/shop/files/2_1ae87c4f-d979-4965-bf41-3204ab33ad88.png?v=1708912275",
              title: "Trọn Bộ Groupset",
              desc: "Đầy đủ thành phần cho một hệ truyền động không dây hoàn hảo."
            },
            { 
              url: "https://wheeltop.com/cdn/shop/files/4_470dee0a-d020-487c-b002-d4c3e00b0922.png?v=1708912276",
              title: "Củ Đề & Pin",
              desc: "Mô-tơ bước mạnh mẽ, pin tích hợp siêu bền."
            }
          ].map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-50 border border-slate-100"
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <h4 className="text-white font-bold text-lg">{img.title}</h4>
                <p className="text-white/70 text-sm">{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-3xl font-bold mb-8 uppercase tracking-tighter text-slate-900">
            TẠI SAO NÊN CHỌN <br /> <span className="text-blue-600">WHEELTOP EDS TX?</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-8 uppercase">
            {FEATURES.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform bg-white w-12 h-12 flex items-center justify-center rounded-xl shadow-sm border border-slate-100">{feature.icon}</div>
                <h4 className="text-lg font-bold mb-2 text-slate-900">{feature.title}</h4>
                <p className="text-slate-500 text-sm normal-case leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-100/50 blur-3xl opacity-30 rounded-full"></div>
          <img 
            src="https://wheeltop.com/cdn/shop/files/cac422ff24643aa66084e21980f18e35.jpg?v=1756709532" 
            alt="Product Detail"
            className="w-full h-auto rounded-3xl border border-slate-200 shadow-xl relative z-10"
          />
        </div>
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section id="trust" className="py-24 bg-surface-800 relative">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto glass-morphism p-12 rounded-[3rem] text-center border-blue-200 bg-white/80">
        <div className="inline-block p-4 bg-blue-600 rounded-2xl mb-8 -mt-20 shadow-xl shadow-blue-600/40">
          <ShieldCheck className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">TRIONEER CYCLING STORE</h2>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed italic">
          "Sứ mệnh của chúng tôi là mang những linh kiện xe đạp hiệu suất cao nhất thế giới về Việt Nam, đi kèm dịch vụ hỗ trợ chu đáo nhất."
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 mb-1">100%</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Chính Ngạch</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 mb-1">VN</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Bảo Hành Tại Chỗ</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 mb-1">FREE</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Lắp Đặt & Cân Chỉnh</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 mb-1">BEST</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Giá Phân Phối</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const OrderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bike: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Có lỗi xảy ra khi gửi yêu cầu.');
      }

      setIsSuccess(true);
      setFormData({ name: '', phone: '', bike: '' });
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="order" className="py-24 bg-surface-800 border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 uppercase text-slate-900">ĐẶT HÀNG NGAY <br /> <span className="text-blue-600">NHẬN ƯU ĐÃI</span></h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Hãy để lại thông tin, đội ngũ kỹ thuật của Trioneer sẽ liên hệ tư vấn giải pháp lắp đặt tối ưu nhất cho cấu hình xe của bạn.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold">Hotline / Zalo</p>
                  <p className="text-xl font-bold text-slate-900">{CONTACT_PHONE}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold">Giao hàng</p>
                  <p className="text-xl font-bold text-slate-900">Tận nơi trên toàn quốc</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl relative shadow-xl shadow-slate-200/50">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-slate-600">Họ và tên</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-blue-500 transition-colors text-slate-900"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-slate-600">Số điện thoại</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-blue-500 transition-colors text-slate-900"
                      placeholder="090..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-slate-600">Dòng xe đang sử dụng</label>
                    <input 
                      type="text" 
                      name="bike"
                      value={formData.bike}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-blue-500 transition-colors text-slate-900"
                      placeholder="Giant Propel, Trek Madone..."
                    />
                  </div>
                  
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      {error}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Đang gửi..." : "GỬI YÊU CẦU"} <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-slate-900">Thành công!</h3>
                  <p className="text-slate-600">Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ trong ít phút.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-blue-600 font-bold underline"
                  >
                    Gửi yêu cầu khác
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionTitle>Câu Hỏi Thường Gặp</SectionTitle>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 text-left flex justify-between items-center group bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900">{faq.question}</span>
                <ChevronRight className={`w-5 h-5 transition-transform text-blue-500 ${openIndex === i ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-6 text-slate-600 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-surface-900">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Trioneer Cycling Logo" className="w-8 h-8 object-contain" />
          <span className="font-display font-bold text-lg tracking-tighter text-slate-900">TRIONEER <span className="text-blue-500">CYCLING</span></span>
        </div>
        <p className="text-slate-500 text-sm">© 2026 Trioneer Cycling Store. All rights reserved.</p>
      </div>
      <div className="flex flex-col items-center md:items-end gap-2">
        <p className="font-bold flex items-center gap-2"><Phone className="w-4 h-4" /> {CONTACT_PHONE}</p>
        <p className="text-slate-400 text-sm">Nhà phân phối chính thức Wheeltop Việt Nam</p>
      </div>
    </div>
  </footer>
);

const FloatingCTA = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <a 
      href={ZALO_LINK}
      className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/50 hover:scale-110 transition-transform active:scale-95"
      title="Zalo Chat"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
    <a 
      href={`tel:${CONTACT_PHONE}`}
      className="bg-emerald-500 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 transition-transform active:scale-95"
      title="Call Now"
    >
      <Phone className="w-6 h-6 text-white" />
    </a>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="selection:bg-blue-500 selection:text-white bg-white">
      <Navbar />
      <main>
        <Hero />
        <TrustPoints />
        <VideoShowcase />
        <PromoOffer />
        <PainPoints />
        <ProductShowcase />
        <TrustSection />
        <FAQ />
        <OrderForm />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
