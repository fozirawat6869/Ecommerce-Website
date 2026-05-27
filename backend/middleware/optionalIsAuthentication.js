import jwt from "jsonwebtoken";

export default async function optionalAuth(req, res, next) {

  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

      if (err) {
        return next();
      }

      req.user = decoded;

      next();

    });

  } catch (err) {

    next();

  }

}