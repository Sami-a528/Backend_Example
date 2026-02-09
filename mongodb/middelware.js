const { dbConnection } = require("./dbConnection.js");

const checkEmail = async (req, res, next) => {
  try {
    const { sEmail, id } = req.body;

    if (!sEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    const myDB = await dbConnection();
    const studentCollection = myDB.collection("student");
    const existingEmail = await studentCollection.findOne({ sEmail });


    if (existingEmail && !id) {
      return res.status(409).json({ message: "Email already exists" });
    }


    if (existingEmail && existingEmail._id.toString() !== id) {
      return res.status(409).json({ message: "Email already exists" });
    }

    next(); 
  } catch (error) {
    console.error("Email check error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkEmail };
