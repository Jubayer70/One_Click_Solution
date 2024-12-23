const mongoos = require("mongoose");
const services = new mongoos.Schema(
  {
    url: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require: true,
    },
    // author: {
    //   type: String,
    //   require: true,
    // },
    price: {
      type: Number,
      require: true,
    },
    desc: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

module.exports = mongoos.model("services", services);