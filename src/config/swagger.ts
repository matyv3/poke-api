import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
const options = {
  swaggerDefinition: {
    info: {
      title: 'Pokemon REST API',
      version: '1.0.0',
      description: 'Documentacion de la API'
    }
  },
  apis: [path.join(__dirname, '../api/controllers/*.{ts,js}')]
};
export const specs = swaggerJsdoc(options);

