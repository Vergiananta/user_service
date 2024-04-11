const jwt = require("jsonwebtoken");

const tokenValidation = (req, res, next, role) => {
  const { authorization } = req.headers;
  if (authorization) {
    if (authorization.startsWith("Bearer")) {
      const token = authorization.slice(7, authorization.length);
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.sendStatus(401);
        } else {
          const decodedToken = decoded;
          if (role == decodedToken.role) {
            if (Date.now() >= decodedToken.exp * 1000) {
              res.sendStatus(401);
            } else {
              next();
            }
          } else {
            res.sendStatus(401);
          }
        }
      });
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = tokenValidation;
