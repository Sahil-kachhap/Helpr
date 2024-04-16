/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: 'ap-south-1.graphassets.com',
            },
        ],
    }
};

export default nextConfig;
