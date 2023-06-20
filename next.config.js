/** @type {import('next').NextConfig} */

const API_DOMAIN = process.env.API_DOMAIN

module.exports = {
	async rewrites() {
        console.log("rewrites called")
		return [
			{
				source: '/api/:path*',
				destination: `${API_DOMAIN}/:path*`,
			},
		]
	},
	images: {
		domains: [
			'res.cloudinary.com'
		]
		// remotePatterns: [
		//   {
		// 	protocol: 'https',
		// 	hostname: 'www.rei.com',
		// 	port: '',
		// 	pathname: '/account123/**',
		//   },
		// ],
	  },
}