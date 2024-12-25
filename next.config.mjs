/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "",
                pathname: "/**",
                search: "",
            },
            {
                protocol: "https",
                hostname: "random.imagecdn.app",
                port: "",
                pathname: "/**",
                search: "",
            },
            {
                protocol: "https",
                hostname: "fakeimg.pl",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "5dqfv1cutvkufesw.public.blob.vercel-storage.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
