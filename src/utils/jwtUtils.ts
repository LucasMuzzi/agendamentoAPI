import jwt from "jsonwebtoken";


export const generateToken = (userId: string) => {
  const secretKey = process.env.JWT_SECRET_KEY || "secret";

  const payload = { userId };

  const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
  return token;
};
