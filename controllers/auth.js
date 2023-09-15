const User = require("../models/user");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptoJS.AES.encrypt(
      req.body.password,
      process.env.secretKey
    ).toString(),
    isAdmin: req.body.isAdmin || false,
  });

  try {
    const findUser = await User.findOne({
      email: req.body.email,
      username: req.body.username,
    });
    if (!findUser) {
      await user.save();
      console.log("saved");
      console.log(user);
      return res.status(200).json(user);
    } //*why save() not create()? because of const user = new User({}) that we made before...if not we could've used create() normally
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  return res.json("user already exist").status(200);
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user.email)
      res.json("Please enter your Email or Username correctly").status(500);
    const hashedPassword = cryptoJS.AES.decrypt(
      user.password,
      process.env.secretKey
    );
    const unHashedPassword = hashedPassword.toString(cryptoJS.enc.Utf8);
    if (unHashedPassword !== req.body.password) {
      res.json("please enter a correct password").status(500);
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.secretKey,
      { expiresIn: "3d" }
    );

    const { password, __v, ...others } = user._doc; //* to log the object without the password... you can not use delete user.password like we did with SQL in IA
    console.log(others);

    return res.json({ ...others, accessToken }).status(200);
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
};
module.exports = {
  register,
  login,
};
