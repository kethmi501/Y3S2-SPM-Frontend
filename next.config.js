require('dotenv').config()
/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com', 'firebasestorage.googleapis.com'],
  },
  env: {
    GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API,
  },
}
