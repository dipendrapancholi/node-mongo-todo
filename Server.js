const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/AllRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGOURI)
    .then(() => console.log("Connect successfully..."))
    .catch((error) => console.log(error));

app.use("/api", routes);

app.listen(PORT, () => console.log(`Listening to ${PORT}`));