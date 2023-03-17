require('dotenv').config()
const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

const router = require("./routes/events.route.js");

app.use("/", router);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${process.env.PORT} `);
});