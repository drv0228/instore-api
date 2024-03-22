const knex = require("knex")(require("../knexfile"));

const post = (req, res) => {
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res.status(400).send("Error Please fill all the fields");
  } else {
    knex("inventories")
      .insert(req.body)
      .then((result) => {
        if (result.length === 0) {
          return res.status(404).json({
            message: `Iventory with ID: ${req.params.id} not found.`,
          });
        }
        // no content response
        res.status(204).send({ message: "successfully posted" });
      })
      .catch(() => {
        res.status(500).json({ message: "Unable to post" });
      });
  }
};

module.exports = {
  post,
};