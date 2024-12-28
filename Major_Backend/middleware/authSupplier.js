const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // The token is prefixed with "Bearer ", so split and get the second part
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.supplier = decoded.supplier;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
