import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
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
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    config.module.rules.push({
      test: /\.(mp4)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/videos/",
            outputPath: `${isServer ? "../" : ""}static/videos/`,
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });

    return config;
  },
}

module.exports = nextConfig

