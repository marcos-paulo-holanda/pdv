const express = require("express");
const authRoutes = require("./authRoute");
const inventoryRoutes = require("./inventory"); 
const metricsRoutes = require("./metrics");
const salesRoutes = require("./sales");
const suppliersRoutes = require("./suppliers");
const userRoutes = require("./user");

const router = express.Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(salesRoutes);
router.use(inventoryRoutes);
router.use(suppliersRoutes);
router.use(metricsRoutes);

module.exports = router;
