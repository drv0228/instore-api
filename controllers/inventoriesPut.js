const knex = require("knex")(require("../knexfile"));

const putSingleItem = (req, res) => {
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res
      .status(400)
      .send(
        "The request was unsucceful due to missing properties in the request body"
      );
  } else if (String(Number(req.body.quantity)) == "NaN") {
    return res
      .status(400)
      .json({ message: `The value of quantity is not a number` });
  } else {
    knex("inventories")
      .where({ id: req.params.id })
      .then((data) => {
        if (data.length === 0) {
          return res
            .status(404)
            .json({ message: `Inventory with ID: ${req.params.id} not found` });
        }
        knex("warehouses")
          .where({ id: req.body.warehouse_id })
          .then((data) => {
            if (data.length === 0) {
              return res
                .status(404)
                .json({
                  message: `Warehouse with ID: ${req.body.warehouse_id} not found`,
                });
            }
            knex("inventories")
              .where({ id: req.params.id })
              .update(req.body)
              .then(() => {
                return knex
                  .select(
                    "warehouse_id",
                    "item_name",
                    "description",
                    "category",
                    "status",
                    "quantity"
                  )
                  .from("inventories")
                  .where({
                    id: req.params.id,
                  });
              })
              .then((updatedItem) => {
                res.json(updatedItem[0]);
              })
              .catch(() => {
                res
                  .status(500)
                  .json({
                    message: `Unable to update inventory item with ID: ${req.params.id}`,
                  });
              });
          });
      });
  }
};

module.exports = {
  putSingleItem,
};