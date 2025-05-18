// require("dotenv").config();

// const { APP_HOST, APP_PORT } = process.env;

// ENV VARIABLES

const app_port = 3000;
const app_url = "http://localhost";

// IMPORTS

const express = require("express");
const postsRouter = require("./routers/posts");
const app = express();
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// MIDDLEWARE

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Server del mio blog</h1>");
});

// ROUTING

app.use("/posts", postsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(app_port, () => {
  console.log("Il server é in ascolto su " + app_url + ":" + app_port);
});
