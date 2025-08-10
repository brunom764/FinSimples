module.exports = {
    async rewrites() {
      return [
        {
          source: "/api/predict",
          destination: process.env.API_URL || "",
        },
      ]
    },
  }
