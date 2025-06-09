/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
	devIndicators: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lucas-tostee-assets.s3.eu-west-1.amazonaws.com'
			},
		],
	},
}

export default nextConfig
