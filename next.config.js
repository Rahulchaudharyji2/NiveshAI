const backendUrl = (
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000"
).replace(/\/$/, "");

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/mutual/:path*',
        destination: `${backendUrl}/api/mutual/:path*`,
      },
      {
        source: '/api/stock/:path*',
        destination: `${backendUrl}/api/stock/:path*`,
      },
      {
        source: '/api/crypto/:path*',
        destination: `${backendUrl}/api/crypto/:path*`,
      },
    ];
  },
}
