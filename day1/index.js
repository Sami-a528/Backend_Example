
// const {addToCart, changeValue, } = require("./cartModule");

// console.log("Hello Sami");

// let arr = [10, 20, 30, 40];

// arr.forEach((value, index) => {
//   console.log(value, index, arr[3]);
// });
// console.log(addToCart());
// console.log("hello pooja");
// console.log(changeValue());

const express = require("express");
const { checkToken } = require("./middleWare");

const app = express()
const port = 8000;
app.use(express.json());

// let checkToken = (req, res, next) => {
//     console.log("Welcome Sami");
//     next()
// }
// app.use(checkToken)  //MiddleWare

// app.use(checkToken)

app.get("/", async(req, res) => {
    res.send("Hello Beta");
});
app.get("/home", checkToken, (req, res) => {
  res.send("This is home page");
});

app.get("/news/:id",(req, res) => {
    let newsId = req.params.id
    res.send("news id = " + newsId);
    console.log("news id = " + newsId);
})
app.post("/login", (req, res) => {
    // console.log(req.body);
    // console.log(req.query)
    // res.send({
    //     bodyData: req.body,
    //     queryData: req.query,
    // })
    console.log(req.body);
    console.log(req.query);
    res.status(200).json({
      bodyData: req.body,
      queryData: req.query,
    });
})

app.listen(port, () => {
    console.log(`app is listen on port ${port}`);
})