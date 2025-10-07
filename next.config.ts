import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "localhost:3000",
			},
		],
	},
};

export default nextConfig;
