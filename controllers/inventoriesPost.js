const knex = require("knex")(require("../knexfile"));

const add = (req, res) => {
  const { warehouse_name, item_name, description, category, status, quantity } = req.body;

  if (!warehouse_name || !item_name || !description || !category || !status || !quantity) {
    return res.status(400).json({ message: "Missing properties in the request body" });
  }else if (String(Number(req.body.quantity)) == "NaN") {
    return res
      .status(400)
      .json({ message: `The value of quantity is not a number` });
  } else {
    knex("warehouses")
          .where({ warehouse_name })
          .first()
          .then((warehouse) => {
            if (!warehouse) {
              throw new Error("Warehouse not found");
            }
            // Add the warehouse_id to the req.body
            req.body.warehouse_id = warehouse.id;
            delete req.body.warehouse_name;
  console.log("Received data:", req.body);


  return knex("inventories").insert(req.body);
})
.then((result) => {
  console.log("Insert result:", result);
  return knex
    .select("id", "warehouse_id", "item_name", "description", "category", "status", "quantity")
    .from("inventories")
    .where({ id: result[0] });
})
.then((createdItem) => {
  console.log("Created item:", createdItem);
  res.status(201).json(createdItem);
})
.catch((err) => {
  console.error("Database error:", err);
  res.status(500).json({ message: "Unable to create new item" });
});
}
};

module.exports = { add };