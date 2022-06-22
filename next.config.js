/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/japanese/kana/practice.html",
        destination: "/japanese/kana/practice",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
