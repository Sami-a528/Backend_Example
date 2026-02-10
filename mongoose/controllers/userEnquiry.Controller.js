const enquiryModel = require("../models/enquiry.model");

const enquiryInsert = (req, res) => {
  const { Name, Email, Phone, Message } = req.body;

  const newEnquiry = enquiryModel({
    name: Name,
    email: Email,
    phone: Phone,
    message: Message,
  });
  newEnquiry
    .save()
    .then(() => {
      res.send({
        status: 1,
        message: "Enquiry Saved !",
      });
    })
    .catch((err) => {
      res.send({
        status: 0,
        message: "Eerror in DB",
        error: err,
      });
    });
};

const enquiryLists =  async (req, res) => {
    const enquiryList = await enquiryModel.find();
    res.status(200).json({
        status: 1,
        message: "Enquiry List !",
        data: enquiryList
    })
}

const enquiryDeletes =  async (req, res) => {
    const { id } = req.params
    const enquiryDelete = await enquiryModel.deleteOne({_id: id});
    res.status(200).json({
        status: 1,
        message: "Enquiry deleted successfuly !",
        data: enquiryDelete,
    });
}

const enquiryUpdates = async (req, res) => {
    const { id } = req.params;
    const { Name, Email, Phone, Message } = req.body;

    const objUpdate = {
        name: Name,
        email: Email,
        phone: Phone,
        message: Message
    }
    const updateEnquiry = await enquiryModel.updateOne({ _id: id }, objUpdate);
    res.status(200).json({
        status: 1,
        message: "Enquiry Updated successfuly !",
        data: updateEnquiry,
    });
}

module.exports = {enquiryInsert, enquiryLists, enquiryDeletes, enquiryUpdates}