/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Add correct content-type for video files
        source: "/:path*.mp4",
        headers: [
          {
            key: "Content-Type",
            value: "video/mp4",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

