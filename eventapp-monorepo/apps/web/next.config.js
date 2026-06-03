/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // serverActions enabled by default in Next 14+
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
