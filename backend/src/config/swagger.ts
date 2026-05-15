import swaggerJSDoc from "swagger-jsdoc";


/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication management APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *               role:
 *                 type: string
 *                 example: ADMIN
 *     responses:
 *       201:
 *         description: User registered successfully
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
/**
 * Swagger/OpenAPI Configuration
 */
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Sentinel-AI API",
      version: "1.0.0",
      description:
        "Production-style AI-SOC backend API documentation",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  /**
   * Route files for Swagger scanning
   */
  apis: [
    "./src/routes/*.ts",
    "./src/routes/**/*.ts",
    "./src/docs/*.ts",
  ],
};

/**
 * Generate Swagger spec
 */
const swaggerSpec =
  swaggerJSDoc(options);

  console.log(
  JSON.stringify(swaggerSpec, null, 2)
  );

export default swaggerSpec;