const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const Cart = require("../models/cart");

//*CREATE
router.post("/createCart", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    await newCart.save();
    console.log("saved");
    console.log(newCart);
    return res.status(200).json(newCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
//*UPDATE
router.put("/updateCart/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
//*DELETE
router.delete(
  "/deleteCart/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const deletedCart = await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedCart);
    } catch (error) {
      console.log(error);
      return res.status(404).json(error);
    }
  }
);
//*GET BY ID
router.get("/getById/:userId", async (req, res) => {
  try {
    const newCart = await Cart.findOne({ userID: req.params.userId });
    return res.status(200).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});
//*GET ALL
router.get("/getAll", async (req, res) => {
  try {
    const Carts = await Cart.find();
    res.status(200).json(Carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
