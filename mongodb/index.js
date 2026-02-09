const express = require("express");
const { dbConnection } = require("./dbConnection.js");
const { checkEmail } = require("./middelware.js");
const { ObjectId } = require("mongodb");
const app = express();

const port = 8080;

app.use(express.json());

app.get("/std-read", async (req, res) => {
  const myDB = await dbConnection();
  const studentCollection = myDB.collection("student");
  const data = await studentCollection.find().toArray();

  const resObj = {
    status: 1,
    msg: "Data fetched successfuly from DB",
    data,
  };
  res.send(resObj);
});

app.post("/std-insert", checkEmail, async (req, res) => {
  const myDB = await dbConnection();
  const studentCollection = myDB.collection("student");

  // const obj = {
  //     sName: req.body.sName,
  //     sEmail: req.body.sEmail
  // };
  const { sName, sEmail } = req.body;
  const obj = { sName, sEmail };
  console.log(obj);

  const checkmail = await studentCollection.findOne({ sEmail });
  if (checkmail) {
    return res.send({
      status: 0,
      msg: "Email already exists ... try another mail",
    });
  }

  const insertResponse = await studentCollection.insertOne(obj);

  const resObj = {
    status: 1,
    msg: "successfuly inserted in DB",
    insertResponse,
  };

  res.send(resObj);
});

app.delete("/std-delete/:id", async (req, res) => {
  const { id } = req.params;
  const myDB = await dbConnection();
  const studentCollection = myDB.collection("student");
  const delResponse = await studentCollection.deleteOne({
    _id: new ObjectId(id),
  });

  const resObj = {
    status: 1,
    msg: "successfuly Deleted from DB",
    delResponse,
  };

  res.send(resObj);
});

app.put("/std-update/:id", async (req, res) => {
  const { id } = req.params;
  const { sName, sEmail } = req.body;
  const obj = {};

  if (sName !== "" && sName !== undefined && sName !== null) {
    obj["sName"] = sName;
  }
  if (sEmail !== "" && sEmail !== undefined && sEmail !== null) {
    obj["sEmail"] = sEmail;
  }
  const myDB = await dbConnection();
  const studentCollection = myDB.collection("student");
  const updateResponse = await studentCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: obj },
  );

  const resObj = {
    status: 1,
    msg: "successfuly Updated in DB",
    updateResponse,
  };

  res.send(resObj);
});

app.listen(port, () => {
  console.log(`App is listen on port`, port);
});
