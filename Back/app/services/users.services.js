const userRepository = require("../repository/users.repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// create
exports.create = async (user) => {
  const finduser =  await userRepository.findOne({email:user.email})
  if(finduser) return {name : "ERROR_EMAIL_EXISTE"}
  const store = await userRepository.create(user)
  if(!store) return {name : "ERROR_STORE_USER"}
  return  {name:"DONE" , data : store}
};

// Retrieve all Users from the database.
exports.findAll = async (condition) => {
  const mycondition = condition ; 
  const getall = await userRepository.findAll(mycondition)
  if(!getall) return {nama : "ERROR_FIND_ALL_USERS"}
  return  {name:"DONE" , data : getall}
};

// findOne
exports.findOne =async(id) => {
  const user = await userRepository.findOne(id)
  if(!user) return {nama : "ERROR_FIND_USERS"}
  return  {name:"DONE" , data : user}
};

// Update a user
exports.update =async (payload, id) => {
  const finduser = await userRepository.findOne({id:id})
  if(!finduser) return {name :"USER_NOT_FOUND"}
  const edite = await userRepository.update(payload , finduser.id)
  if(!edite) return {nama : "ERROR_FIND_USERS"}
  return  {name:"DONE" , data : edite}
};

// Delete a user
exports.delete = async (id) => {
  const deleteUser = await userRepository.delete(id)
  if(!deleteUser) return {nama : "ERROR_DELETE_USER"}
  return  {name:"DONE" , data : deleteUser}
};

// finduser  
exports.findAll = async (condition) => {
  const mycondition = condition ; 
  const getall = await userRepository.findAll(mycondition)
  if(!getall) return {nama : "ERROR_FIND_ALL_USERS"}
  return  {name:"DONE" , data : getall}
};




// Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums) => {
//       res.send({ message: `${nums} Users were deleted successfully!` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Users.",
//       });
//     });
// };

// // find all published User
// exports.findAllPublished = (req, res) => {
//   User.findAll({ where: { published: true } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users.",
//       });
//     });
// };
