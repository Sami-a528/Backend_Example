const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");
const routerEnquiry = require("./routes/enquiryRoute")


app.use(cors());
app.use(express.json())

app.use("/api", routerEnquiry);
//http://localhost:8000/api/enquiryinsert

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB Connected Successfully");
}).catch((err) => {
    console.log(err);
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on Port ${process.env.PORT}`)
})