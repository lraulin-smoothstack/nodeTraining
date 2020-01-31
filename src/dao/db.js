const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "database-1.cluster-cljto1olbi3i.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Ny0726UVbMOGsgruKgZb",
  database: "node",
});

module.exports = connection;
