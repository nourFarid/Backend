const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    //*not working
    // const token = authHeader.split(" ")[1];
    jwt.verify(authHeader, process.env.secretKey, (error, user) => {
      if (error) {
        return res.status(403).json("invalid token!!!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated!!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("you are not allowed to do this operation!!");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("you are not allowed to do this operation!!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
