module.exports = {
  apps: [
    {
      name: 'poke-api',
      script: 'build/init.js',
      watch: false,
      env: {
		  NODE_ENV: 'production',
		  PORT: 3000,
		  TYPEORM_CONNECTION: mysql,
		  TYPEORM_HOST: '${{ secrets.MYSQL_HOST }}',
		  TYPEORM_USERNAME: '${{ secrets.MYSQL_USER }}',
		  TYPEORM_PASSWORD: '${{ secrets.MYSQL_PASSWORD }}',
		  TYPEORM_DATABASE: '${{ secrets.MYSQL_DATABASE }}',
		  TYPEORM_PORT: '${{ secrets.MYSQL_PORT }}',
		  TYPEORM_SYNCHRONIZE: true,
		  TYPEORM_LOGGING: true,
		  TYPEORM_ENTITIES : './**/domain/*.js',
		  JWT_SECRET: '${{ secrets.JWT_SECRET }}',
      },
    },
  ],
};

