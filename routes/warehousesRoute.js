const express = require("express");
const warehousesRoute = express.Router();

const warehousesDelete = require("../controllers/warehousesDelete"); // warehouses DELETE controller module

const warehousesGet = require("../controllers/warehousesGet"); // warehouses GET controller module

const warehousesPost = require("../controllers/warehousesPost"); // warehouses POST controller module

// warehouses GET route for getting all warehouses list
warehousesRoute.get("/", warehousesGet.getAll);

const warehousesPut = require("../controllers/warehousesPut");

// warehouses GET route for getting all warehouse items
warehousesRoute.get(
  "/:id/inventories",
  warehousesGet.getSingleWarehouseInventory
);

// warehouses GET route for post/creating a New Warehouse
warehousesRoute.get("/:id", warehousesGet.getSingleWarehouse);

// warehouses POST route for post/creating a New Warehouse
warehousesRoute.post("/", warehousesPost.add);

// warehouses PUT route to allow editing of the warehouse details
warehousesRoute.put("/:id", warehousesPut.put);

// warehouses DELETE route for post/creating a New Warehouse
warehousesRoute.delete("/:id", warehousesDelete.remove);

function logMessage(req, res, next) {
  next();
}

module.exports = warehousesRoute;