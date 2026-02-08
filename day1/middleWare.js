require("dotenv").config();
console.log(process.env.MyToken)
const myToken = process.env.MyToken

const checkToken = (req, res, next) => {
  console.log(req.query.token);
  if (req.query.token == "" || req.query.token == undefined) {
    return res.send({
      status: 0,
      msg: "Please fill the token",
    });
  }
  if (req.query.token != myToken) {
    return res.send({
      status: 0,
      msg: "Please fill correct tockens",
    });
  }
  next();
};

module.exports = {checkToken};
