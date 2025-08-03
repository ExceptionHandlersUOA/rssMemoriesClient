import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			new URL("https://upload.wikimedia.org/**"),
			{
				protocol: "https",
				hostname: "archivebackend.feroxfoxxo.com",
				pathname: "**",
			},
		],
	},
	output: "standalone",
};

export default nextConfig;
