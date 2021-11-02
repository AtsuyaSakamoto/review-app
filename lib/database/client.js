const path = require("path");
const { sql } = require("@garafu/mysql-fileloader")({
  root: path.join(__dirname, "./sql"),
});
const pool = require("./pool");

const MYSQLClient = {
  executeQuery: async function (query, values) {
    let results = await pool.executeQuery(query, values);
    return results;
  },
};

module.exports = {
  MYSQLClient,
  sql,
};
