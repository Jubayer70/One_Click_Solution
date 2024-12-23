const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth.js");



//api localhost:1000/api/v1/sign-up
router.post("/sign-up", async (req, res) => {
  try{
    const { username, email, password, nid, contact,address} = req.body;
    //check username length less than 4
    if (username.length < 4) {
      return res.status(400).json({ message : "Username length needs to be more than 3"});
    }
    //code for if username is already registerd or not
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
       return res.status(400).json({ message : "Username not available"});
    }
    ///code for if email is registerd or not
    const existingEmail = await User.findOne({ email: email});
    if (existingEmail) {
       return res.status(400).json({ message : "Email not available"});
    }
    if (password.length < 4) {
      return res.status(400).json({ message : "Password length needs to be more than 3"});
    }

    // if (nid.length < 3) {
    //   return res.status(400).json({ message : "NID Number needs to be more than 3"});
    // }
    // //code for if nid is already registerd or not
    // const existingNID = await User.findOne({ nid: nid });
    // if (existingNID) {
    //    return res.status(400).json({ message : "NID already in Use"});
    // }

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      // nid: nid,
      contact: contact,
      address: address
    });
    await newUser.save();
    return res.status(200).json({ message: "SignUp Sucessfully" });
  }
  catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
})
//Sign in 
//api = localhost:1000/api/v1/sign-in
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.status(400).json({ message: "Invalid UserName or Password" });
    }

  await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existingUser.username },
          { role: existingUser.role },
        ]
        const token = jwt.sign({ authClaims }, "Household70",{ expiresIn: "30d" });
        res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      }
      else {
         res.status(400).json({message: "Invalid Username or Password"});
      }
    });
  }
  catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
})
//get user information
//api: localhost:1000/api/v1/get-user-information
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select('-password');
    return res.status(200).json(data);
  }
  catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});
//update address
//api : localhost:1000/api/v1/update-address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address })
     return res.status(200).json({ message: "Address updated Successfully"});
  }
  catch (error) {
     res.status(500).json({ message: "Internal Server error" });
  }
})

module.exports = router;