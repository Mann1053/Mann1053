const jwt = require("jsonwebtoken");
const { UserToken } = require("../models");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userToken = await UserToken.findOne({ where: { token } });

    if (!userToken) {
      throw new Error();
    }

    console.log("Usertokennnnn => ", userToken.userId);

    req.user = decoded;
    req.user_id = userToken.userId; // user_token.dataValues.id;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = authMiddleware;
