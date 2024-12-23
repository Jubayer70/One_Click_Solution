const router = require("express").Router();
const User = require("../models/user.js");
const { authenticateToken } = require("./userAuth");

//put services to cart
router.put("/add-to-cart", authenticateToken, async(req, res)=> {
  try {
    const { servicesid, id } = req.headers;
    const userData = await User.findById(id);
    const isfavouritecart = userData.cart.includes(servicesid);
    if (isfavouritecart) {
      return res.json({
        status: "Success",
        message: "Service is already in cart",
      });
    }
    await User.findByIdAndUpdate(id, {
      $push: { cart: servicesid },
    });

    return res.json({
      status: "Success",
      message: "Services added to cart",
    })
    
  }catch(error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//remove from cart
router.put("/remove-from-cart/:servicesid", authenticateToken, async(req, res)=> {
  try {
    const { servicesid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {
      $pull: { cart: servicesid },
    });

    return res.json({
      status: "Success",
      message: "Services removed from cart",
    })
    
  }catch(error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//cart of an user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    return res.json({
      satus: "Success",
      data: cart,
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({message: "An error occured"})
  }
});




module.exports = router;