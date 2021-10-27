const PORT = process.env.PORT;
const path = require("path");
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

// app.get("/", (req, res) => {
//   res.end("Hello World");
// });

// Express setting
app.set("view engine", "ejs");
// サーバー情報の隠蔽
app.disable("x-powered-by");

// Static resource rooting
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// Dynamic resource rooting
app.use("/", require("./routes/index.js"));

// Execute web application
app.listen(PORT, () => {
  console.log(`Application listening at ${PORT}`);
});
