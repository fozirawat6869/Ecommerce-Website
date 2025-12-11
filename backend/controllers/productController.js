
import HandleError from '../utils/handleErrors.js'
import handleAsyncErrors from '../middleware/handleErrorAsync.js'
import connection from '../config/sqldb.js'
import twilio from 'twilio'
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


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


// user otp send 


export const sendOTP = (req, res, next) => {
    console.log("send otp api", req.body);
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).json({
            success: false,
            message: "Please provide mobile number"
        });
    }

    // 1️⃣ Check if mobile is already registered
    connection.query(
        `SELECT mobile FROM users WHERE mobile = ?`,
        [mobile],
        async (err, result) => {
            if (err) {
                console.log("Error in query of check mobile", err);
                return next(new HandleError("Error in query of check mobile", 400));
            }

            if (result.length > 0) {
                // Mobile already exists
                return res.status(400).json({
                    success: false,
                    message: "Mobile number is already registered"
                });
            }

            // 2️⃣ Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000);
            const expireTime = new Date(Date.now() + 5 * 60 * 1000)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');

            // 3️⃣ Save OTP in DB
            const query = `REPLACE INTO user_otps(mobile, otp, expires_at) VALUES (?, ?, ?)`;
            connection.query(query, [mobile, otp, expireTime], async (err, result) => {
                if (err) {
                    console.log("Error in query of send OTP", err);
                    return next(new HandleError("Error in query of send OTP", 400));
                }

                // 4️⃣ Send OTP using Twilio
                try {
                    const message = await client.messages.create({
                        body: `Your OTP is ${otp}`,
                        from: process.env.TWILIO_PHONE_NUMBER,
                        to: `+91${mobile}`
                    });

                    return res.status(200).json({
                        success: true,
                        message: `OTP sent to mobile number ${mobile}`
                    });

                } catch (err) {
                    console.log("Twilio error:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Failed to send OTP",
                        error: err.message
                    });
                }
            });
        }
    );
}






// veryfiy otp
export const verifyOTP=(req,res)=>{
  console.log("verify otp api",req.body)
  //  { mobile: '8755306869', otp: '553306' }
  const {mobile,otp}=req.body
  
  const query=`select * from user_otps where mobile=?`
  connection.query(query,[mobile],(err,result)=>{
      console.log(result)
       if(err){
        console.log(err)
      }
      
      if(result[0].otp!==otp){
        return res.status(400).json({
          success: false,
          message: "otp is wrong"
        });
      }

     if(result[0].otp==otp){
        connection.query(`insert into users (mobile) values (?)`,[mobile],(err,result)=>{
          if(err){
            console.log("error in insert user",err)
          }
          res.status(200).json({
            success:true,
            message:"OTP verified successfully, user registered"
          })
        })
     }
  })
}



// login conteoler


export const loginOTP = (req, res) => {
  console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TOKEN:", process.env.TWILIO_AUTH_TOKEN);
console.log("PHONE:", process.env.TWILIO_PHONE_NUMBER);

    console.log(req.body ,"login otp api");
    const { mobile } = req.body;

    connection.query(
        `SELECT * FROM users WHERE mobile = ?`,
        [mobile],
        async (err, result) => {
          console.log(result,"select * from mobile")
            if (err) {
                console.log("Error in login query:", err);
                return res.status(500).json({
                    success: false,
                    message: "Server error while checking mobile",
                });
            }

            if (result.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Mobile number not registered",
                });
            }

            const otp = Math.floor(100000 + Math.random() * 900000);
            const expireTime = new Date(Date.now() + 5 * 60 * 1000)
                .toISOString()
                .replace("T", " ")
                .slice(0, 19); // SQL DATETIME format

            const query = `REPLACE INTO user_otps (mobile, otp, expires_at) VALUES (?, ?, ?)`;

            connection.query(query, [mobile, otp, expireTime], async (err,result) => {
                console.log(result,"insert into user_otps")  
              if (err) {
                    console.log("Error in query of send OTP:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Database error while saving OTP",
                    });
                }

                try {
                    await client.messages.create({
                        body: `Your OTP is ${otp}`,
                        from: process.env.TWILIO_PHONE_NUMBER,
                        to: `+91${mobile}`,
                    });

                    return res.status(200).json({
                        success: true,
                        message: `OTP sent to mobile number ${mobile}`,
                    });

                } catch (err) {
                    console.log("Twilio error:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Failed to send OTP",
                        error: err?.message || "Unknown error",
                    });
                }
            });
        }
    );
};


           


