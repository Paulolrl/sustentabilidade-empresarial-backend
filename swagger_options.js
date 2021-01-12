module.exports = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "API Sustentabilidade Empresarial",
         version: "1.0.0",
         description: "Sustentabilidade Empresarial server API built with Swagger",
         contact: {
            name: "Sustentabilidade Empresarial",
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
            url: "http://143.106.73.67:3000/"
         }
      ]
   },
   apis: [
      "./api/routes/*.js",
      "./api/models/*.js"
   ]
}