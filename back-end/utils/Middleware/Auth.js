const jwt = require("jsonwebtoken");

const nonAdminAuth = (req, res, next) => {
  //get the token from the header if present
  const token = req.headers["authorization"];

  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log(ex)
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};

const AdminAuth = (req, res, next) => {
  //get the token from the header if present
  const token = req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.data;
    if (decoded.isAdmin == false) return res.status(401).send("Token does not provide Admin privilages");
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};

module.exports = { nonAdminAuth, AdminAuth }