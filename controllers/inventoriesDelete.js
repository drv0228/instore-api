const knex = require("knex")(require("../knexfile"));

const remove = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({
          message: `Iventory with ID: ${req.params.id} to be deleted not found.`,
        });
      }
      // no content response
      res.status(204).send({ message: "successfully deleted" });
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete the inventory" });
    });
};

module.exports = {
  remove,
};
