const enquiryList = require("../models/enquiryModel");

const enquiryInsert = (req, res) => {
  const { name, email, phone, message } = req.body;

  const newEnquiry = new enquiryList({
    name,
    email,
    phone,
    message,
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

const enquiryAllData = async(req, res) => {
  const enquiryData = await enquiryList.find()
  res.send({
    status: 1,
    message: "All Data",
    enquiryData: enquiryData
  })
}

const enquiryDelete = async (req, res) => {
  const enid = req.params.id
  const enquiryDel = await enquiryList.deleteOne({_id: enid})
  res.send({
    status: 1,
    message: "deleted",
    enquiryDel,
  });
}

const enquirySingleRow = async(req, res) => {
  const  enid  = req.params.id
  const enquiryRow = await enquiryList.findOne({ _id: enid })
  res.send({
    status: 1,
    message: "Find",
    enquiryRow,
  });
}

const updateSingleRow = async (req, res) => {
  const enquiryid = req.params.id;
  const { name, email, phone, message } = req.body;
  const updateObj = {
    name,
    email,
    phone,
    message,
  }
  const updateRow = await enquiryList.updateOne({ _id: enquiryid }, updateObj);
  res.send({
    status: 1,
    message: "update successfully !",
    updateRow,
  });
}

module.exports = { enquiryInsert, enquiryAllData, enquiryDelete, enquirySingleRow, updateSingleRow };
