const PORT = process.env.PORT || 3000;
const path = require("path");
const logger = require("./lib/log/logger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

// Express settings
app.set("view engine", "ejs");
// サーバー情報の隠蔽
app.disable("x-powered-by");

// Expose global method to view engine
app.use((req, res, next) => {
  res.locals.moment = require("moment");
  res.locals.padding = require("./lib/math/math.js").padding;
  next();
});

// Static resource rooting.
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// Set access log.
app.use(accesslogger());

// Dynamic resource rooting.
app.use("/", require("./routes/index.js"));
app.use("/test", async (req, res, next) => {
  const { MYSQLClient, sql } = require("./lib/database/client.js");
  // client.jsへの切り分け

  // const { promisify } = require("util");
  // const path = require("path");
  // const { sql } = require("@garafu/mysql-fileloader")({root:path.join(__dirname,"./lib/database/sql")});
  // const config = require("./config/mysql.config.js");
  // const mysql = require("mysql");
  // const con = mysql.createConnection({
  //   host: config.HOST,
  //   port: config.PORT,
  //   user: config.USERNAME,
  //   password:config.PASSWORD,
  //   database: config.DATABASE
  // });
  // const client = {
  //   connect: promisify(con.connect).bind(con),
  //   query: promisify(con.query).bind(con),
  //   end: promisify(con.end).bind(con)
  // };
  let data;

  try {
    // poolで不要に
    // await MYSQLClient.connect();
    data = await MYSQLClient.executeQuery(await sql("SELECT_SHOP_BASIC_BY_ID"),[1]);
    console.log(data);
  } catch (err) {
    next(err);
  }
  // 下記もpoolで不用に
  // finally {
  //   await MYSQLClient.end();
  // }

  res.end("ok");
});

// Set application log.
app.use(applicationlogger());

// Execute web application.
app.listen(PORT, () => {
  logger.application.info(`Application listening at :${PORT}`);
});
