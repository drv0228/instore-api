const knex = require("knex")(require("../knexfile"));

const put = (req, res) => {
  if (
    !req.body.contact_position ||
    !req.body.contact_name ||
    !req.body.country ||
    !req.body.city ||
    !req.body.address ||
    !req.body.warehouse_name
  ) {
    return res.status(400).json({
      message:
        "The request was unsuccessful due to missing properties in the request body",
    });
  } else {
    //Validate correct phone number field.
    let regexTel = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/;

    console.log(regexTel.test(req.body.contact_phone));

    if (!regexTel.test(req.body.contact_phone)) {
      return res.status(400).json({
        message:
          "Invalid phone number, please provide a valid phone for the user in the request",
      });
    } else {
      //Validate correct email field.

      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      console.log(regexEmail.test(req.body.contact_email));
      if (!regexEmail.test(req.body.contact_email)) {
        return res.status(400).json({
          message:
            "Invalid email address, please provide a valid email for the user in the request",
        });
      } else {
        knex("warehouses")
          .where({ id: req.params.id })
          .then((data) => {
            if (data.length === 0) {
              return res.status(404).json({
                message: `Inventory with ID: ${req.params.id} not found`,
              });
            }
            knex("warehouses")
              .where({ id: req.params.id })
              .update(req.body)
              .then(() => {
                return knex
                  .select(
                    "id",
                    "warehouse_name",
                    "address",
                    "city",
                    "country",
                    "contact_name",
                    "contact_position",
                    "contact_phone",
                    "contact_email"
                  )
                  .from("warehouses")
                  .where({
                    id: req.params.id,
                  });
              })
              .then((updatedWarehouse) => {
                res.status(200).json(updatedWarehouse[0]);
              })
              .catch(() => {
                res.status(500).json({
                  message: `Unable to update warehouse with ID: ${req.params.id}`,
                });
              });
          });
      }
    }
  }
};
module.exports = {
  put,
};