/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode:false,
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'ayliweb.ir'
            },
           
        ]
    },
	// ...
	output: "standalone",
	// ...
};

export default nextConfig;
