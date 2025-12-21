
import HandleError from '../utils/handleErrors.js'
import handleAsyncErrors from '../middleware/handleErrorAsync.js'
import connection from '../config/sqldb.js'
import dotenv from 'dotenv';
import axios from 'axios';
import jwt from 'jsonwebtoken';

dotenv.config({ path: './config/config.env' });


// send OTP

export const sendOTP = (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ success: false, message: "Mobile number is required" });
  }

  // Check if mobile already exists
  const query = `SELECT * FROM users WHERE mobile = ?`;
  connection.query(query, [mobile], (err, result) => {
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

    // Mobile not registered → send OTP
    axios.get(`https://2factor.in/API/V1/${process.env.API_KEY}/SMS/${mobile}/AUTOGEN`)
      .then(response => {
        const session_id = response.data.Details;
        const OTP = response.data.OTP;
        connection.query(`insert into users (mobile) values (?)`, 
          [mobile], 
          (err,result) => {
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
    axios.get(`https://2factor.in/API/V1/${process.env.API_KEY}/SMS/${mobile}/AUTOGEN`)
      .then(response => {
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
export const verifyOTP = async (req, res) => {
  console.log("verify otp api", req.body);
  const { session_id, otp,mobile } = req.body;

  if (!session_id || !otp || !mobile) {
    return res.status(400).json({ success: false, message: "Session ID and OTP are required" });
  }

  try {
    const response = await axios.get(
      `https://2factor.in/API/V1/${process.env.API_KEY}/SMS/VERIFY/${session_id}/${otp}`
    );

    const token=jwt.sign({ mobile:mobile },process.env.JWT_SECRET,{ expiresIn:'7d' })
    console.log("Generated JWT Token:", token);
    if (response.data.Status === "Success") {
      return res.status(200).json({ success: true, message: "OTP verified successfully", token });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

  } catch (err) {
    console.log("2Factor Verify Error:", err.response?.data || err.message);
    res.status(500).json({ success: false, message: "OTP verification failed", error: err.message });
  }
};



export const getAllProducts=handleAsyncErrors(async(req,res,next)=>{
  console.log("all products ")
  console.log(req.query)
 
  console.log(req.query)  //  get the page,limit form query
  let category=req.query.category;
  let price=req.query.price;
  // console.log(price)
  // console.log(category)
   let page = parseInt(req.query.page) || 1;   // if no page given, use 1
  let limit = parseInt(req.query.limit) ||2; // if no limit given, use 2
   let offset = (page - 1) * limit;
   let query="select * from products where 1=1"
  //   if category is there in query
      if(category==="Men" || category==="Women"){
        query+=` and category = "${category}"`
      }
     if(price==="100" || price==="200" || price==="300" || price==="400" || price==="500" || price==="1000"  ){    
          query+=` and price<=${price}`
       }
       if(price==="1000plus"){
        query+=` and price>=1000 `
       }
  
    
      // pagination
        query += ` LIMIT ${limit} OFFSET ${offset}`;
    connection.query(query,(err,result)=>{
    // console.log(result)
     if(err){
      console.log(err)
      return next(new HandleError("error in query of allProducts",400))
     }
    res.status(200).json({
      success:true,
      allProduct:result
    })
  })
  
})






export const categoryProducts = handleAsyncErrors(async (req, res, next) => {
    try {
        console.log("Query params:", req.query);

        const { category, categories, limit, page } = req.query;

        const limitNum = parseInt(limit) || 10;
        const pageNum = parseInt(page) || 1;
        const offset = (pageNum - 1) * limitNum;

        let query = `SELECT * FROM products WHERE 1=1`;
        let params = [];

        // Filter by category if provided
        if (category) {
            query += ` AND category = ?`;
            params.push(category);
        }

        // Filter by sub_category if provided
        if (categories) {
            query += ` AND sub_category = ?`;
            params.push(categories);
        }

        // Add pagination
        query += ` LIMIT ? OFFSET ?`;
        params.push(limitNum, offset);

        connection.query(query, params, (err, result) => {
            if (err) {
                console.error("Error in query:", err);
                return next(new HandleError("Database query error", 400));
            }

            if (result.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: "No products available for this category",
                    products: []
                });
            }

            res.status(200).json({
                success: true,
                categoryProducts: result
            });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        return next(new HandleError("Server error", 500));
    }
});




export const productDetails=(req,res)=>{

 
  const {id}=req.params
  console.log(id)
  connection.query("select * from products where product_id=?",[id],(err,result)=>{
    console.log(result)
    if(err){
      return console.log("err in query of details product",err)
    }
    res.status(201).json({
      success:true,
      productDetail:result[0]
    })
  })
}




export const createProduct=(req,res)=>{
  console.log(req.body)
  const {name,description,price}=req.body
  connection.query("INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
  [name, description, price],
  (err, result) => {
    if (err){
      console.log("Error in query:", err);
  return res.status(500).json({ success:false, message: "Error" });
    } 
    res.json({ success:true, result });
  }
);

}

// for show newly added product in home page in main

export const newlyAddedProducts=(req,res)=>{
  // let datys=15
  // console.log(req.query) get the page and limit from query
  let {page,limit}=req.query;
  page=Number(page)||1
  limit=Number(limit)||8
  let offset=(page-1)*limit
    connection.query(`select * from products where created_at >= DATE_SUB(NOW(),INTERVAL 15 DAY) order by created_at desc limit ${limit} offset ${offset}`,(err,result)=>{
      console.log(result)
      if(err){
      return next(new HandleError("error in query of newly added products",400))
    }
    res.status(200).json({
      success:true,
      newlyAddedProducts:result
    }) 
  })
}

// api for frontend to show the categories in ui

export const categories=(req,res)=>{
    connection.query('select * from categories',(err,result)=>{
      console.log(result)
      if(err){
        console.log("error in categories api")
        return;
      }
      res.status(200).json({
        success:true,
        categories:result
      })
    })
}


export const attributes=(req,res)=>{
    connection.query('select * from attributes ',(err,result)=>{
      console.log(result)
      if(err){
        console.log("error in attributes api")
        return;
      }
      res.status(200).json({
        success:true,
        attributes:result
      })
    })
}



export const attribute_values=(req,res)=>{
    connection.query('select * from attribute_values ',(err,result)=>{
      console.log(result)
      if(err){
        console.log("error in attribute_values api")
        return;
      }
      res.status(200).json({
        success:true,
        attribute_values:result
      })
    })
}


