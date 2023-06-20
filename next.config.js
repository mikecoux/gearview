/** @type {import('next').NextConfig} */

const API_DOMAIN = process.env.API_DOMAIN

module.exports = {
	images: {
		domains: [
			'res.cloudinary.com'
		]
	},
}