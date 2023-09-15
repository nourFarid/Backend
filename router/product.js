const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const Product = require("../models/product");

//*CREATE
router.post("/createProduct", verifyTokenAndAdmin, async (req, res) => {
  const product = new Product({
    title: req.body.title,
    desc: req.body.desc,
    img: req.body.img,
    category: req.body.category,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price,
  });

  try {
    await product.save();
    console.log("saved");
    console.log(product);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
//*UPDATE
router.put("/updateProduct/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
//*DELETE
router.delete("/deleteProduct/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});
//*GET BY ID
router.get("/getById/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});
//*GET ALL
router.get("/getAll", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
