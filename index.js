const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = process.env.PORT || 8080;
const url = process.env.MONGODB;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB connected.");
}

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  age: Number,
  govtIdType: String,
  govtIdNumber: String,
  number: Number,
  email: String,
  guardianType: String,
  guardianName: String,
  country: String,
  state: String,
  city: String,
  address: String,
  pincode: Number,
  religion: String,
  maritalStatus: String,
  bloodGroup: String,
  occupation: String,
});

const User = mongoose.model("User", userSchema);

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.post("/api/users", async (req, res) => {
  let user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.gender = req.body.gender;
  user.age = req.body.age;
  user.govtIdType = req.body.govtIdType;
  user.govtIdNumber = req.body.govtIdNumber;
  user.number = req.body.number;
  user.email = req.body.email;
  user.guardianType = req.body.guardianType;
  user.guardianName = req.body.guardianName;
  user.country = req.body.country;
  user.state = req.body.state;
  user.city = req.body.city;
  user.address = req.body.address;
  user.pincode = req.body.pincode;
  user.religion = req.body.religion;
  user.maritalStatus = req.body.maritalStatus;
  user.bloodGroup = req.body.bloodGroup;
  user.occupation = req.body.occupation;
  const doc = await user.save();

  console.log(doc);
  res.json(doc);
});

server.get("/api/users", async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});

server.listen(port, () => {
  console.log("Server started.");
});
