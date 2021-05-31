const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) res.status(401).send("Access Denied");

  try {
    const user = jwt.verify(token, "secret");
    if (user) req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).send("Invalid credentials");
  }
};
module.exports = authMiddleware;
