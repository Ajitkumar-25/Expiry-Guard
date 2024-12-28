var express = require("express");
var router = express.Router();
const inventoryController = require("../controller/inventoryController");
const authRetailer = require("../middleware/authRetailer");
const authSupplier = require("../middleware/authSupplier");

router.post(
  "/api_add_product",
  authRetailer,
  inventoryController.api_add_product
);
router.post(
  "/api_update_quantity",
  authRetailer,
  inventoryController.api_update_quantity
);
router.post(
  "/api_getRetailersForSupplier",
  authSupplier,
  inventoryController.api_getRetailersForSupplier
);
router.post(
  "/api_getSuppliersForRetailer",
  authRetailer,
  inventoryController.api_getSuppliersForRetailer
);
router.post(
  "/api_getExpiringProducts",
  inventoryController.api_getExpiringProducts
);
router.post("/api_getInventory", inventoryController.api_getInventory);

router.post(
  "/api_getInventoryForRetailerBySupplier",
  inventoryController.api_getInventoryForRetailerBySupplier
);

router.post("/api_productRequests", inventoryController.api_productRequests);

router.post(
  "/api_SeeProductRequests",
  inventoryController.api_SeeProductRequests
);

router.post("/api_get_sales_data", inventoryController.api_get_sales_data);

router.post(
  "/api_updateProductRequestStatus",
  inventoryController.api_updateProductRequestStatus
);
router.post(
  "/api_getRetailerProductRequests",
  inventoryController.api_getRetailerProductRequests
);
router.post(
  "/api_getExpiringProductsForSupplier",
  inventoryController.api_getExpiringProductsForSupplier
);
router.get("/api_getSuppliersAndRetailers",inventoryController.api_getSuppliersAndRetailers)
module.exports = router;
