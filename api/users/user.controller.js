const {create, getUsers, getUsersById, getUsersByEmail} = require('./user.service');
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: [     
      // Define validation rules for input data using the 'body' function
      body('firstname').not().isEmpty(),
      body('lastname').not().isEmpty(),   
      body('gender').isIn(['Male', 'Female']),
      body('occupation').not().isEmpty(),
      body('address').not().isEmpty(),
      body('hobbies').not().isEmpty(),
      body('email').isEmail(),
      body('password').isLength({ min: 5 }),
    
      (req, res) => {
          // Check for validation errors
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() });
          }
  
          // Input data is valid, proceed with handling the request
          const body = req.body;
          const salt = genSaltSync(10);
          body.password = hashSync(body.password, salt);
  
          create(body, (err, results) => {
              if (err) {
                  console.log(err);
                  return res.status(500).json({
                      success: 0,
                      message: 'database connection error'
                  });
              }
              return res.status(200).json({
                  success: 1,
                  data: results
              });
          });
      }
  ],
      getUsersById: (req, res) =>{
         const id = req.params.id;
         getUsersById(id, (err, results) =>{
            if(err){
              console.log(err);
               return;
            }
            if(!results){
                 return res.json({
                    success: 0, 
                    message:'Record not found'
                 });
              }
              return res.json({
                success: 1, 
                data: results
             });
         });
    },
    getUsers: (req, res) =>{
        getUsers((err, results) =>{
           if(err){
             console.log(err);
              return;
           }
           if(!results){
                return res.json({
                   success: 0, 
                   message:'Record not found'
                });
             }
             return res.json({
               success: 1, 
               data: results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        console.log(body);
        if (!body || !body.email || !body.password) {
          return res.status(400).json({
            success: 0,
            message: "Email and password are required",
          });
        }
        getUsersByEmail(body.email, (err, user) => {
            console.log("email",body.email);
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Internal server error",
            });
          }
          console.log("user",user);
     
          if (!user) {
            return res.status(401).json({
              success: 0,
              message: "Invalid email or password",
            });
          }
         
          const result = bcrypt.compare(body.password, user[0].password);
          console.log("res", result);
          if (result) {
            user.password = undefined; // Remove the hashed password from the user object
            const jsontoken = sign({ result: user }, "qwe1234", {
              expiresIn: "1h",
            });
            return res.json({
              success: 1,
              message: "Login successful",
              token: jsontoken,
            });
          } else {
            return res.status(401).json({
              success: 0,
              message: "Invalid email or password",
            });
          }
        });
    }
      
      
}