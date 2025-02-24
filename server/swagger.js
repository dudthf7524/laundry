const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger 옵션 설정
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '업무 공정 관리 API 문서',
      version: '1.0.0',
      description: '업무 공정 및 직원 업무 관리 API 문서',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./src/controllers/*.js'], // 주석을 자동으로 읽을 위치 설정
};

// Swagger 명세 생성
const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
