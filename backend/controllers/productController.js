
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



// All Products 

export const getAllProducts=handleAsyncErrors(async(req,res,next)=>{
  console.log("all products ")
  console.log(req.query)
 
  console.log(req.query)  //  get the page,limit form query
  let category=req.query.category;
  let price=req.query.price;
  let size=req.query.size;
  // console.log(price)
  // console.log(category)
   let page = parseInt(req.query.page) || 1;   // if no page given, use 1
  let limit = parseInt(req.query.limit) ||2; // if no limit given, use 2
   let offset = (page - 1) * limit;
  //  let query="select * from product where 1=1"

  let query = "select p.*,(select pi.image_path from product_images pi where pi.product_id = p.product_id limit 1) as image from product p";


    // if category is there in query
      if(category==="Men" || category==="Women" || category==="Mouse" || category==="Camera" || category==="Earphones" || category==="Mobiles" || category==="Speakers" || category==="Televisions" || category==="Trimmers" || category==="Watches"){
        query+=` join category c on p.product_category_id=c.id and c.name="${category}"`
      }
     if(price==="100" || price==="200" || price==="300" || price==="400" || price==="500" || price==="1000"  ){    
          query += ` where p.product_price <=${price}`;
       }
       if(price==="1000plus"){
        query+=` where p.product_price >= 1000 `
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




// Category filtered products

export const categoryProducts = handleAsyncErrors(async (req, res, next) => {
    try {
        console.log("Query params:", req.query);

        const { category, SubCategory, sizes, colors, limit, page, price } = req.query;
       
        const limitNum = parseInt(limit) || 10;
        const pageNum = parseInt(page) || 1;
        const offset = (pageNum - 1) * limitNum;

        let query = `
          SELECT p.*,
          (SELECT pi.image_path 
           FROM product_images pi 
           WHERE pi.product_id=p.product_id 
           LIMIT 1) as image
          FROM product p
        `;

        let params = [];

        // JOIN first
        if (category) {
            query += ` JOIN category c ON p.product_category_id = c.id`;
        }

        // ALWAYS start WHERE
        query += ` WHERE 1=1`;

        // Category filter
        if (category) {
            query += ` AND c.name = ?`;
            params.push(category);
        }

        // SubCategory filter (FIXED)
        if (SubCategory) {
            query += ` AND JSON_EXTRACT(p.product_attributes, '$.SubCategory') = ?`;
            params.push(SubCategory);
        }

        // Size filter
        if (sizes) {
            query += ` AND JSON_UNQUOTE(JSON_EXTRACT(p.product_attributes, '$.sizes')) = ?`;
            params.push(sizes);
        }

        // Color filter
        if (colors) {
            query += ` AND JSON_UNQUOTE(JSON_EXTRACT(p.product_attributes, '$.colors')) = ?`;
            params.push(colors);
        }

        if(price){
          if(price==="100" || price==="200" || price==="300" || price==="400" || price==="500" || price==="1000"){
            query += ` AND p.product_price <= ?`;
            params.push(price);
          }
        }
        if(price==="1000plus"){
          query+=` AND p.product_price >= ?`
          params.push(1000)
        }

        // Pagination
        query += ` LIMIT ? OFFSET ?`;
        params.push(limitNum, offset);

        console.log("FINAL QUERY:", query);
        console.log("PARAMS:", params);

        connection.query(query, params, (err, result) => {
            if (err) {
                console.error("Error in query:", err);
                return next(new HandleError("Database query error", 400));
            }

            res.status(200).json({
                success: true,
                categoryProducts: result || []
            });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        return next(new HandleError("Server error", 500));
    }
});



// Product Details

export const productDetails=(req,res)=>{

 
  const {id}=req.params
  console.log(id)
  const queryProduct=`select * from product where product_id=?`;
  connection.query(queryProduct,[id],(err,result)=>{
    console.log(result)
    if(err){
   }

    connection.query(`select image_path from product_images where product_id=?`,[id],(err,images)=>{
       console.log("images query result",images)
      if(err){
        return console.log("err in query of details product images",err)
      }
    res.status(201).json({
      success:true,
      productDetail:result[0],
      images:images.map(img=>img.image_path) // extract image paths into an array
    })
  })
}
)
}



// Create Product

export const createProduct = (req, res) => {

  // What it does:
// It pulls out the main fields (name, description, etc.) from req.body
// Everything else that is left (brand, type) is stored in the variable attributes
  let { name, description, price, quantity,category, ...attributes } = req.body;
  category=Number(req.body.category)
  console.log(attributes)

  attributes=JSON.stringify(attributes) // convert attributes to JSON string for storing in DB

  
console.log("req.body:", req.body);
  console.log("req.files:", req.files); // ✅ correct

  // loop through all images
  const imagePaths = req.files.map(file => file.path.replace(/\\/g,"/"));
  const fileNames = req.files.map(file => file.filename);

  console.log("image paths:", imagePaths);
  console.log("file names:", fileNames);

connection.query(`insert into product(product_name,product_description,product_price,product_quantity,product_category_id,product_attributes) values(?,?,?,?,?,?)`,
[name,description,price,quantity,category,attributes],(err,result)=>{  
  if(err){
    console.log("Error in query:", err);
    return res.status(500).json({ success: false, message: "DB error" });
  }   
  console.log(result) 



   const productId=result.insertId; // get the auto-generated product ID
   const finalPath= imagePaths.map(path=>[productId,path])
   console.log("final paths with product ID:", finalPath)

   connection.query("insert into product_images(product_id,image_path) values ?",[finalPath],(err,result)=>{
    if(err){
      console.log("Error in inserting images:", err);
      return res.status(500).json({ success: false, message: "DB error while saving images" });
    }
    console.log("Images inserted successfully:", result);
    res.status(201).json({
      success: true,
      message: "Product created successfully with images"
    });
   }
  )

})}

// for show newly added product in home page in main

export const newlyAddedProducts=(req,res)=>{
  
  // console.log(req.query) get the page and limit from query
  // let {page,limit}=req.query;
  // page=Number(page)||1
  // limit=Number(limit)||8
  // let offset=(page-1)*limit
  //   connection.query(`select * from products where created_at >= DATE_SUB(NOW(),INTERVAL 15 DAY) order by created_at desc limit ${limit} offset ${offset}`,(err,result)=>{
  //     console.log(result)
  //     if(err){
  //     return next(new HandleError("error in query of newly added products",400))
  //   }
  //   res.status(200).json({
  //     success:true,
  //     newlyAddedProducts:result
  //   }) 
  // })
}

// api for frontend to show the categories in ui






export const categories=(req,res)=>{
   connection.query("select * from category",(err,result)=>{
     console.log(result)
     if(err){
      console.log("err in categories query",err)
      return 
     }
     res.status(200).json({
      success:true,
      categories:result
     })
   })
}


export const userProfile=(req,res)=>{

const mobile=req.user.mobile;

connection.query(`select * from users where mobile=?`,[mobile],(err,result)=>{

  if(err){
    console.log("err in user profile query",err)
    return res.status(500).json({ success: false, message: "DB error" });
  }
  console.log("user profile query result",result)
  res.status(200).json({
    success:true,
    user:result[0]
  })
})
}


export const updateUserProfile=(req,res)=>{
  
  console.log("update user profile api", req.body);

  const{ first_name,last_name,email}=req.body;
  const mobile=req.user.mobile;

  connection.query("update users set first_name=?, last_name=?, email=? where mobile=?",
  [first_name,last_name,email,mobile],(err,result)=>{
    if(err){
      console.log("err in update user profile query",err)
      return res.status(500).json({ success: false, message: "DB error" });
    }
     
    connection.query(`select * from users where mobile=?`,[mobile],(err,userdata)=>{
        
      console.log("user profile query result after update",userdata)
      if(err){
        console.log("err in user profile query after update",err)
        return res.status(500).json({ success: false, message: "DB error" });
      }

  
    res.status(200).json({
      success:true,
      message:"User profile updated successfully",
      data:userdata
    })
  })
}
  )}