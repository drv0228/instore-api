// Import dotenv to process environment variables from `.env` file.
require("dotenv").config();

//Setting up database connection creating in knexfile.js locally
// module.exports = {
//   client: "mysql",
//   connection: {
//     host: "localhost",
//     database: "instore",
//     user: "root",
//     password: "rootroot",
//     charset: "utf8",
//   },
// };

// Setting up database connection creating in knexfile.js & using .env file
module.exports = {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      charset: "utf8",
      connectTimeout: 10000  
    },
  };
 
