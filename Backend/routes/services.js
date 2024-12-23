const router = require("express").Router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const Services = require("../models/services.js");
const { authenticateToken } = require("./userAuth.js");

//admin
router.post("/add-services", authenticateToken, async (req, res) => {
  try {
    //check if the is admin or not
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
          return res.status(400).json({ message: "You dont have the access to perform this" });
        }
    const services = new Services({
      url: req.body.url,
      title: req.body.title,
      price: req.body.price,
      desc: req.body.desc,
    })
    await services.save();
    res.status(200).json({ message: "Services added Successfully" });
  }
  catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
  
})

//update Services
router.put("/update-services", authenticateToken, async (req, res) => {
  try {
    const { servicesid } = req.headers;
    await Services.findByIdAndUpdate(servicesid, {
      url: req.body.url,
      title: req.body.title,
      price: req.body.price,
      desc: req.body.desc,
    });
    return res.status(200).json({
      message: "Services Updated Successfully",
    })
  }
  catch (error) {
   //console.log(error);
    res.status(500).json({ message: "An Error Occurred" });
  }
});

//Delete Services
router.delete("/delete-services", authenticateToken, async (req, res) => {
  try {
    const { servicesid } = req.headers;
    await Services.findByIdAndDelete(servicesid);
    return res.status(200).json({
      message: "Services Removed Successfully",
    })
  }
  catch (error) {
   //console.log(error);
    res.status(500).json({ message: "An Error Occurred" });
  }
});

//Get-all Services
router.get("/get-all-services", async (req, res) => {
  try {
    const services = await Services.find().sort({ createAt: -1 });
    return res.json({
      status: "Success",
      data: services,
    });
  }
  catch (error) {
    res.status(500).json({ message: "An Error Occurred" });
  }
});
//Get-recent-services
router.get("/get-recent-services", async (req, res) => {
  try {
    const services = await Services.find().sort({ createAt: 1 }).limit(4);
    return res.json({
      status: "Success",
      data: services,
    });
  }
  catch (error) {
    res.status(500).json({ message: "An Error Occurred" });
  }
});

//get services by id
router.get("/get-services-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const services = await Services.findById(id);
    return res.json({
      status: "Success",
      data: services,
    });
  }
  catch (error) {
    return res.status(500).json({ message: "An Error Occurred" });
  }
});


module.exports = router;
// res.status(500).json({ message: "Internal Server error" });