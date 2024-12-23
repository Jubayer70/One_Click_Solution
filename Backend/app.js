const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn"); 
const user = require("./routes/user");
const services = require("./routes/services");
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");

app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1", user);
app.use("/api/v1", services);
app.use("/api/v1", favourite);
app.use("/api/v1", cart);
app.use("/api/v1", order);

//crating port
app.listen(1000, () => {
  console.log(`Server Started at port ${process.env.PORT}`);
}); 