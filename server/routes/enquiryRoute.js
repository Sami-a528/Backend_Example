const express = require("express");
const { enquiryInsert, enquiryAllData, enquiryDelete, enquirySingleRow, updateSingleRow } = require("../controllers/enquiryController.js");
const routerEnquiry = express.Router()

routerEnquiry.post("/enquiryinsert", enquiryInsert);
routerEnquiry.get("/enquirydata", enquiryAllData);
routerEnquiry.delete("/enquirydelete/:id", enquiryDelete);
routerEnquiry.get("/single-row/:id", enquirySingleRow);
routerEnquiry.put("/enquiryupdate/:id", updateSingleRow)

module.exports = routerEnquiry