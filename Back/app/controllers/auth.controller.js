const userServices = require("../services/users.services.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { httpBadRequest, httpOk } = require("../helpers/responses");
const { users } = require("../models");

const SECRET_TOKE =  process.env.SECRET_TOKE

// Create and Save a new Tutorial
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const condition = { email: email };
    const user = await users.findOne({ where: condition });
    if (!user) {
      return res.status(400).json({ message: "email n'est pas existe" });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mote de pass et incorrecte" });
    }
    console.log('userrr' , SECRET_TOKE )

    // Generate a JWT
    const token = jwt.sign(user.dataValues, SECRET_TOKE); 


    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Register route Admin
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const condition = { email: email };
    const user = await users.findOne({ where: condition });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a user
    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
      role_id: 1,
    };

    const serviceData = await userServices.create(data);
    console.log("serviceData", serviceData.name);
    if (serviceData.name != "DONE") {
      httpBadRequest(res, serviceData.name);
    } else {
      httpOk(res, serviceData.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
