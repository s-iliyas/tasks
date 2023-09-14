import jwt from "jsonwebtoken";

const tokenSecret = process.env.TOKEN_SECRET;

export const authCheck = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const decoded = jwt.verify(token, tokenSecret);
      if (Object.keys(decoded).includes("userId")) {
        req.user = decoded;
        next();
      } else {
        return res.status(401).json({ message: "Invalid Token without userId" });
      }
    } catch (error) {
      if (error.message.toLowerCase().includes("expired")) {
        return res
          .status(400)
          .json({ message: "Token expired, Please login again." });
      } else {
        return res.status(401).json({ message: "Invalid Token" });
      }
    }
  }
};