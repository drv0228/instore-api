const knex = require("knex")(require("../knexfile"));

const getAll = (_req, res) => {
  knex("warehouses")
    .select(
      "warehouses.id",
      "warehouses.warehouse_name",
      "address",
      "city",
      "country",
      "contact_name",
      "contact_position",
      "contact_phone",
      "contact_email"
    )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to get the warehouses" });
    });
};

const getSingleWarehouse = (req, res) => {
  const warehouseId = req.params.id;

  knex
    .select('id', 'warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_position', 'contact_phone', 'contact_email')
    .from("warehouses")
    .where({ id: warehouseId })
    .then((warehouse) => {
      if (warehouse.length === 0) {
        return res.status(404).json({ error: "Warehouse not found" });
      }
      res.status(200).json(warehouse);
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete the inventory" });
    });
};

const getSingleWarehouseInventory = (req, res) => {
  knex
    .select(
      "inventories.id",
      "warehouses.warehouse_name",
      "item_name",
      "description",
      "category",
      "status",
      "quantity"
    )
    .from("inventories")
    .innerJoin("warehouses", "inventories.warehouse_id", "warehouses.id")
    .where({ "warehouses.id": req.params.id })
    .then((data) => {
      if (data.length === 0) {
        return res
          .status(404)
          .json({ message: `Warehouse with ID: ${req.params.id} not found` });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Unable to get the warehouse with ID: ${req.params.id}`,
      });
    });
};

module.exports = {
  getAll,
  getSingleWarehouse,
  getSingleWarehouseInventory,
};