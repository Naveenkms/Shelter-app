/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["jsonkeeper.com","lh3.googleusercontent.com","images.pexels.com","seeklogo.com"]
  }
}

module.exports = nextConfig
