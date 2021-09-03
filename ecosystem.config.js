module.exports = {
  apps: [
    {
      name: 'poke-api',
      script: 'build/init.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3010
      },
    },
  ],
};

