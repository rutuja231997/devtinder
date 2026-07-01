const jwt = require("jsonwebtoken");

const verifyJWT = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
    return decoded;
  } catch (error) {
    throw error;
  }
};

module.exports = verifyJWT;
