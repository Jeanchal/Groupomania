require("dotenv").config();
const jsonWebToken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWebToken.verify(token, process.env.SECURITY_TOKEN);
    const uid = decodedToken.uid;
    req.uid = uid;
    next();
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
