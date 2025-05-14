// require("dotenv").config();

// const { APP_HOST, APP_PORT } = process.env;

const app_port = 3000;
const app_url = "http://localhost";

const express = require("express");
const app = express();

const postsRouter = require("./routers/posts");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1>Server del mio blog</h1>");
});

// ROUTING

app.use("/posts", postsRouter);

app.listen(app_port, () => {
  console.log("Il server é in ascolto su " + app_url + ":" + app_port);
});
