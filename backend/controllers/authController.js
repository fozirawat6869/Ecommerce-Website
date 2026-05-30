
import connection from "../config/sqldb.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import HandleError from "../utils/handleErrors.js";
import dotenv from 'dotenv';


dotenv.config({ path: './config/config.env' });


// send OTP registerr

export const sendOTP = (req, res) => {
  const { mobile } = req.body;
  console.log(req.body)

  if (!mobile) {
    return res.status(400).json({ success: false, message: "Mobile number is required" });
  }

  // Check if mobile already exists
  const query = `SELECT * FROM users WHERE mobile = ?`;
  connection.query(query, [mobile], (err, result) => {
      console.log("Register query result:", result);
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.length > 0) {
      // Mobile already registered → show message but do NOT fail OTP
      return res.status(200).json({ 
        success: true, 
        message: "Mobile number already registered. Please login." 
      });
    }


    //  console.log("Mobile number not registered, sending OTP:", mobile);
     console.log("2Factor API URL:", `https://2factor.in/API/V1/${process.env.API_KEY}/SMS/+91${mobile}/AUTOGEN`);
    // Mobile not registered → send OTP
    axios.get(`https://2factor.in/API/V1/${process.env.API_KEY}/SMS/+91${mobile}/AUTOGEN/OTP1`)
      .then(response => {
        // console.log("2Factor Response:", response);
       
        const session_id = response.data.Details;

        // const OTP = response.data.OTP


        //  console.log("2Factor Response Data:", session_id, OTP);

        
        connection.query(`insert into users (mobile) values (?)`, 
          [mobile], 
          (err,result) => {
            console.log("User insert result:", result);
             if(err){
                return res.status(500).json({
                  success: false,
                  message: "Database error while saving user"


                });
                
             }

               // Only return session_id to client
        res.status(200).json({
          success: true,
          message: `OTP sent to +91${mobile}`,
          session_id
        });
          })
       
      })
      .catch(error => {
        console.log("2Factor Error:", error.response?.data || error.message);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send OTP", 
          error: error.response?.data || error.message 
        });
      });
  });
};


// login

export const loginOTP = (req, res) => {
  const { mobile } = req.body;
  console.log(req.body)

  if (!mobile) {
    return res.status(400).json({ success: false, message: "Mobile number is required" });
  }

  // Check if mobile already exists
  const query = `SELECT * FROM users WHERE mobile = ?`;
  connection.query(query, [mobile], (err, result) => {
    console.log("Login query result:", result);
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.length === 0) {
      // Mobile already registered → show message but do NOT fail OTP
      return res.status(400).json({ 
        success: false, 
        message: "Mobile number is not  registered. Please register first." 
      });
    }

    // Mobile not registered → send OTP
    axios.get(`https://2factor.in/API/V1/${process.env.API_KEY}/SMS/+91${mobile}/AUTOGEN`)
      .then(response => {

        console.log("2Factor Response:", response);
        const session_id = response.data.Details;
     
        // Only return session_id to client
        res.status(200).json({
          success: true,
          message: `OTP sent to +91${mobile}`,
          session_id
        });
          })
       
    
      .catch(error => {
        console.log("2Factor Error:", error.response?.data || error.message);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send OTP", 
          error: error.response?.data || error.message 
        });
      });
  });
};



// verify 
export const verifyOTP =async (req, res) => {
  console.log("verify otp api", req.body);
  const { session_id, otp,mobile } = req.body;

  if (!session_id || !otp || !mobile) {
    return res.status(400).json({ success: false, message: "Session ID and OTP are required" });
  }

  try {
    const response = await axios.get(
      `https://2factor.in/API/V1/${process.env.API_KEY}/SMS/VERIFY/${session_id}/${otp}`
    );

    const token=jwt.sign({ role: "user", mobile:mobile },process.env.JWT_SECRET,{ expiresIn:'30d' })
    console.log("Generated JWT Token:", token);
    if (response.data.Status === "Success") {
      return res.status(200).json({ 
        success: true, 
        message: "OTP verified successfully", 
        token });
    } else {
      return res.status(400).json({ 
        success: false,
         message: "Invalid OTP" });
    }

  } catch (err) {
    console.log("2Factor Verify Error:", err.response?.data || err.message);
    res.status(500).json({ success: false, message: "OTP verification failed", error: err.message });
  }
};




