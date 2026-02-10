const express = require("express");
const mongoose = require("mongoose");
const enquiryRoute = require("./routes/enquiry.route");
const app = express();

require("dotenv").config();

app.use(express.json());

app.use("/web/api/enquiry", enquiryRoute);
//http://localhost:8080/web/api/enquiry/enquiry-insert

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Mongoose Connected! Successfuly")
    });

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
});