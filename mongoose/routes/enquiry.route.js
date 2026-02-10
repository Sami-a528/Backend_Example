const express = require("express");
const { enquiryInsert, enquiryLists, enquiryDeletes, enquiryUpdates } = require("../controllers/userEnquiry.Controller");
const enquiryRoute = express.Router()

enquiryRoute.post("/enquiry-insert", enquiryInsert);

enquiryRoute.get("/enquiry-list", enquiryLists);

enquiryRoute.delete("/enquiry-delete/:id", enquiryDeletes);

enquiryRoute.put("/enquiry-update/:id", enquiryUpdates);

module.exports = enquiryRoute;