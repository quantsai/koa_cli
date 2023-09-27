/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Device management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DeviceBase:
 *       type: object
 *       properties:
 *         deviceId:
 *           type: string
 *           description: Device id
 *           example: "5f5d0f2b-8c1f-4f4f-8b5e-7d7d7d7d7d7"
 *           format: uuid
 *         type:
 *           type: string
 *           description: Device type
 *           example: "world1.0"
 *         name:
 *           type: string
 *           description: Device name
 *       required:
 *         - deviceId
 *
 *     DeviceDetail:
 *       allOf:
 *         - $ref: '#/components/schemas/DeviceBase'
 *         - type: object
 *           properties:
 *             firmwareVersion:
 *               type: string
 *               description: Device name
 *
 *     DeviceDetailExtraUser:
 *       allOf:
 *         - $ref: '#/components/schemas/DeviceDetail'
 *         - type: object
 *           properties:
 *             owner:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 username:
 *                   type: string
 *
 */

/**
 * @swagger
 * /devices/:deviceId:
 *   get:
 *     summary: Get device by id
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: string
 *           required: true
 *           description: Device id
 *           example: "5f5d0f2b-8c1f-4f4f-8b5e-7d7d7d7d7d7"
 *           format: uuid
 *     responses:
 *       200:
 *         description: Device found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 device:
 *                   $ref: '#/components/schemas/DeviceDetailExtraUser'
 */
