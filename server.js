const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const routes = require("./routes");

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());

app.use("/api/v1", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
