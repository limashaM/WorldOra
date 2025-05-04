const mongoose = require('mongoose');
const User = require('../Models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const keysecret = '9f2d7e0c39b837b4f4f2e215f4d26c1c36d6a946485c7cf35c1b7d60f53a5d8b'; 

//email config
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"",
    pass:"teulyldnjnatgdln"
  }
})

// Get all the users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: {
        users
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};


exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password 
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          _id: newUser._id,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email
        }
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        error: 'Email already exists'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        error: error.message
      });
    }

    res.status(500).json({
      status: 'error',
      error: 'Internal server error'
    });
  }
};

//delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Received request to delete user with ID:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid user ID format:", userId);
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      console.log("User not found in database:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("User deleted successfully:", deletedUser);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting the user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//login
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid email' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        cusid: user._id, // assuming user._id is the unique ID
        email: user.email,
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};


  exports.getUserById = async (req, res) => {
    const { userId } = req.params;

    if (!req.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };  
  

//updateUser
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//sendlink
exports.sendLink = async (req, res) => {
  console.log(req.body)

  const { email } = req.body;

  if (!email) {
    return res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const userfind = await User.findOne({ email: email });
    
    if (!userfind) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const token = jwt.sign({ _id: userfind._id }, keysecret, {
      expiresIn: "520s"
    });
    
    const setusertoken = await User.findByIdAndUpdate({_id:userfind._id}, {verifytoken:token},{new:true})

    if(setusertoken){
      const mailOptions = {
        from: "",
        to:email,
        subject:"Sending email for password reset",
        text:`This link valid for 2 MINUTES http://localhost:3000/passwordReset/${userfind._id}/${setusertoken.verifytoken}`
      }

      transporter.sendMail(mailOptions,(error,info) => {
        if(error){
          console.log("error",error);
          res.status(401).json({status:401,message:"Email not send"})
        }else{
          console.log("Email sent",info.response);
          res.status(201).json({status:201,message:"Email send successfully"})
        }
      })
    }

    return res.status(200).json({ status: 200, message: "Token generated successfully", token: token });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

//verifyUser
exports.passwordReset = async (req, res) => {
  const { userId, token } = req.params;
  console.log("token", token);

  try {
    const validuser = await User.findOne({ _id: userId, verifytoken: token });

    if (!validuser) {
      return res.status(401).json({ status: 401, message: "User does not exist" });
    }

    const verifyToken = jwt.verify(token, keysecret);
    console.log(verifyToken);

    if (verifyToken._id) {
      return res.status(201).json({ status: 201, validuser });
    } else {
      return res.status(401).json({ status: 401, message: "Invalid token" });
    }
  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

//changepassword
exports.changePassword = async (req, res) => {
  const userId = req.params.userId;
  const token = req.params.token;

  const {password} = req.body;
  console.log(password)

  try{
    const validuser = await User.findOne({_id:userId,verifytoken:token});

    const verifyToken = jwt.verify(token,keysecret);

    if(validuser && verifyToken._id){
      const newpassword = await bcrypt.hash(password,12);

      const setnewuserpass = await User.findByIdAndUpdate(userId, {password: newpassword});

      setnewuserpass.save();

      res.status(201).json({status:201,setnewuserpass})

    }else{
      res.status(401).json({status:401,message:"User not exist"})
    }

  }catch(error){
    res.status(401).json({status:401,error})
  }
};

//logout function
exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Could not log out, try again' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  };
  