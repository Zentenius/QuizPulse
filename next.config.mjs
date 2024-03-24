/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com", "media.discordapp.net"]
        ,
      },
      typescript: {
        ignoreBuildErrors: true,
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
      output: "standalone",

};

export default nextConfig;
