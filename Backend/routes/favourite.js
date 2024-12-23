const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add book to favourite
router.put("/add-services-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { servicesid, id } = req.headers;
    const userData = await User.findById(id);
    const isfavourite = userData.favourites.includes(servicesid);
    if (isfavourite) {
      return res.status(200).json({ message: "Services is already in favourites " });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: servicesid } });
    return res.status(200).json({ message: "Services added in favourites " });
  }
  catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});


//delete from favourite

router.put("/delete-services-from-favourite", authenticateToken, async (req, res) => {
  try {
    const { servicesid, id } = req.headers;
    const userData = await User.findById(id);
    const isfavourite = userData.favourites.includes(servicesid);
    if (isfavourite) {
       await User.findByIdAndUpdate(id, { $pull: { favourites: servicesid } });
    }
    return res.status(200).json({ message: "Services removed from favourites " });
  }
  catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

//get favourite services from a user

router.get("/get-favourite-services", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites; 
    return res.json({
      satus: "Success",
      data: favouriteBooks,
    });
  }
  catch (error) {
    res.status(500).json({message: "An error occured"})
  }
});

module.exports = router;