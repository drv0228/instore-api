const knex = require("knex")(require("../knexfile"));

const getAll = (_req, res) => {
  knex("inventories")
    .select(
      "inventories.id",
      "warehouses.warehouse_name",
      "item_name",
      "description",
      "category",
      "status",
      "quantity"
    )
    .innerJoin("warehouses", "inventories.warehouse_id", "warehouses.id")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to get the inventory" });
    });
};

const getSingleItem = (req, res) => {
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
    .where({ "inventories.id": req.params.id })
    .then((data) => {
      if (data.length === 0) {
        return res
          .status(404)
          .json({ message: `Inventory with ID: ${req.params.id} not found` });
      }
      res.status(200).json(data[0]);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({
          message: `Unable to get the inventory with ID: ${req.params.id}`,
        });
    });
};

module.exports = {
  getAll,
  getSingleItem,
};