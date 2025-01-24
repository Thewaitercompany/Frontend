import type { NextConfig } from "next"
import type { Configuration as WebpackConfig } from "webpack"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.mp4",
        headers: [
          { key: "Content-Type", value: "video/mp4" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ]
  },
  webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }): WebpackConfig => {
    config.module = config.module || { rules: [] }
    config.module.rules = config.module.rules || []
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
    })
    return config
  },
}

export default nextConfig

