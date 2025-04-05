import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* خيارات التكوين هنا */
  images: {
    domains: [`${process.env.NEXT_PUBLIC_URL}`, "example.com"], // أضف النطاقات المطلوبة
  },
  // إعدادات إعادة الكتابة (إذا كنت بحاجة إليها)
  async rewrites() {
    return [
      {
        source: '/api/:path*', // مسار الطلب
        destination: `${process.env.NEXT_PUBLIC_REST_API_URL}`, // وجهة API الخاصة بك
      },
    ];
  },
  // إعدادات أخرى (إذا كنت بحاجة إليها)
  reactStrictMode: true, // تفعيل وضع القواعد الصارمة في React
};

export default nextConfig;