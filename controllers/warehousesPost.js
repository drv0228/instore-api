const knex = require("knex")(require("../knexfile"));
// create a new warehouse based on the user inputs provided in the front-end. All request body data needs to have validation. For incorrect/incomplete data, the correct error response needs to be sent (with status code and message).

const add = (req, res) => {
  //Validate all values are required (non-empty).
  if (
    !req.body.contact_position ||
    !req.body.contact_name ||
    !req.body.country ||
    !req.body.city ||
    !req.body.address ||
    !req.body.warehouse_name
  ) {
    return res
      .status(400)
      .json({ message: "Missing properties in the request body" });
  } else {
    //Validate correct phone number and email fields.
    let regexTel = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      regexTel.test(req.body.contact_phone) &&
      regexEmail.test(req.body.contact_email)
    ) {
      knex("warehouses")
        .insert(req.body)
        .then((result) => {
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
            .where({ id: result[0] });
        })
        .then((createdWarehouse) => {
          res.status(201).json(createdWarehouse);
        })
        .catch(() => {
          res.status(500).json({ message: "Unable to create new user" });
        });
    } else {
      return res.status(400).json({
        message:
          "Invalid email address or phone number, please provide a valid phone and email for the user in the request",
      });
    }
  }
};

module.exports = { add }; //Export the router so that it can be used in other parts of the application