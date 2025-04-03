import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* خيارات التكوين هنا */
  images: {
    domains: ["localhost", "example.com"], // أضف النطاقات المطلوبة
  },
  // إعدادات إعادة الكتابة (إذا كنت بحاجة إليها)
  async rewrites() {
    return [
      {
        source: '/api/:path*', // مسار الطلب
        destination: 'http://localhost:1337/api', // وجهة API الخاصة بك
      },
    ];
  },
  // إعدادات أخرى (إذا كنت بحاجة إليها)
  reactStrictMode: true, // تفعيل وضع القواعد الصارمة في React
};

export default nextConfig;