/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["jsonkeeper.com", "links.papareact.com","lh3.googleusercontent.com"]
  }
}

module.exports = nextConfig
