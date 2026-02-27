/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // ignores all ESLint errors when building
    },
    images: {
        domains: ["res.cloudinary.com", "lh3.googleusercontent.com"], // ✅ Allow Cloudinary images
    },
    output: 'standalone',
};

module.exports = nextConfig;
