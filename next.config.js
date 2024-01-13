/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jobflex-files.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
