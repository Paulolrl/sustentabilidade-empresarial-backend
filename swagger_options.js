module.exports = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "API Sustentabilidade Empresarial",
         version: "1.0.0",
         description: "Sustentabilidade Empresarial server API built with Swagger",
         license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html"
         },
         contact: {
            name: "Sustentabilidade Empresarial",
            url: "https://sustentabilidade.com",
            email: "sustentabilidade.unicamp@gmail.com"
         }
      },
      components: {
         securitySchemes: {
           bearerAuth: {
             type: 'http',
             scheme: 'bearer'
           }
         }
      },
      security: [{
         bearerAuth: []
      }],
      servers: [
         {
            url: "http://localhost:3000/"
         }
      ]
   },
   apis: [
      "./api/routes/*.js",
      "./api/models/*.js"
   ]
}