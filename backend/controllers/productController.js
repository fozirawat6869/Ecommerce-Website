
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

        const { category, limit, page, price, ...dynamicFilters } = req.query;

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

        // JOIN
        if (category) {
            query += ` JOIN category c ON p.product_category_id = c.id`;
        }

        query += ` WHERE 1=1`;

        // Category filter
        if (category) {
            query += ` AND c.name = ?`;
            params.push(category);
        }

        // ✅ DYNAMIC FILTERS
        Object.keys(dynamicFilters).forEach((key) => {
            const value = dynamicFilters[key];

            if (value) {
                query += ` AND JSON_UNQUOTE(JSON_EXTRACT(p.product_attributes, '$.${key}')) = ?`;
                params.push(value);
            }
        });

        // Price filter
        if (price) {
            if (["100","200","300","400","500","1000"].includes(price)) {
                query += ` AND p.product_price <= ?`;
                params.push(price);
            } else if (price === "1000plus") {
                query += ` AND p.product_price >= ?`;
                params.push(1000);
            }
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



// // Product Details

export const productDetails = (req, res) => {

  const reviewPage = parseInt(req.query.reviewPage) || 1;
  const reviewLimit = parseInt(req.query.reviewLimit) || 2;
  const reviewOffset = (reviewPage - 1) * reviewLimit;

  const { id } = req.params;
  const userMobile = req.user.mobile;

  // 1. Get product
  connection.query(`select * from product where product_id=?`, [id], (err, result) => {

    if (err) {
      return res.status(500).json({ success: false, message: "Error in product query" });
    }

    // 2. Get images
    connection.query(`select image_path from product_images where product_id=?`, [id], (err, images) => {

      if (err) {
        return res.status(500).json({ success: false, message: "Error in images query" });
      }

      // 3. Get reviews
      connection.query(
        `select rating,review_text,u.first_name,u.last_name 
         from reviews r 
         join users u on r.user_id=u.id 
         where r.product_id=? 
         LIMIT ? OFFSET ?`,
        [id, reviewLimit, reviewOffset],
        (err, reviewsResult) => {

          if (err) {
            return res.status(500).json({ success: false, message: "Error in reviews query" });
          }

          // 4. Get user id
          connection.query(`SELECT id FROM users WHERE mobile = ?`, [userMobile], (err, userResult) => {

            if (err || userResult.length === 0) {
              return res.status(200).json({
                success: true,
                productDetail: result[0],
                images: images.map(img => img.image_path),
                reviews: reviewsResult,
                inCart: false
              });
            }

            const user_id = userResult[0].id;

            // 5. Check cart
            connection.query(
              `SELECT id FROM cart WHERE product_id = ? AND user_id = ?`,
              [id, user_id],
              (err, cartResult) => {
                if (err) {
                  console.log("Error while checking cart", err);
                  return res.status(500).json({
                     success: false, 
                     message: "DB error while checking cart" });
                }

                const inCart = cartResult.length > 0;

                res.status(200).json({
                  success: true,
                  productDetail: result[0],
                  images: images.map(img => img.image_path),
                  reviews: reviewsResult,
                  inCart: inCart   
                });

              }
            );

          });

        }
      );

    });

  });
};






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

export const newlyAddedProducts=(req,res,next)=>{
  
  console.log(req.query) // get the page and limit from query
  let {page,limit}=req.query;
  page=Number(page)||1
  limit=Number(limit)||8
  let offset=(page-1)*limit
  let query = `
SELECT p.*,
(
  SELECT i.image_path 
  FROM product_images i 
  WHERE i.product_id = p.product_id 
  LIMIT 1
) AS main_image

FROM product p
WHERE p.created_at >= DATE_SUB(NOW(), INTERVAL 15 DAY)
ORDER BY p.created_at DESC
LIMIT ${limit} OFFSET ${offset}
`
  
     connection.query(query, (err,result)=>{
      console.log("newly added products result:", result);
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

  export const reUpdateProfile=(req,res)=>{
     console.log("reUpdate data",req.body)
     console.log("authenticate profile", req.user)
     const {first_name,last_name,email}=req.body
     let userMobile=req.user.mobile
     let query="update users set "
     let values=[]
      
     if(first_name){
       query +=`first_name=?, `
       values.push(first_name)
     }
     if(last_name){
      query += `last_name=?, `
      values.push(last_name)
     }
     if(email){
      query += "email = ?, "
      values.push(email)
     }
    
     
 // remove last comma
  query = query.slice(0, -2)

      query += ` where mobile=?`
       values.push(userMobile)

       console.log("final query",query)
       console.log("final values",values)
     connection.query(query,values,(err,result)=>{
      if(err){
        console.log("err in backend with query", err)
        res.status(500).json({
          success:false,
          message:"failed re update the profile"
        })
      }
      console.log("reupdata the result",result)
      res.status(201).json({
        success:true,
        message:"re update user profile successfuly",
        data:result,

      })
     })
  }


  // Reviews and Ratings 

export const reviews = async (req, res) => {

  console.log("review api called", req.body);
  console.log("authenticated user in review api", req.user);

  const { productId, rating, review } = req.body;
  const userMobile = req.user.mobile;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product id is required"
    });
  }

  // 1. Get user id using mobile
  connection.query(
    `SELECT id FROM users WHERE mobile = ?`,
    [userMobile],
    (err, userResult) => {

      if (err) {
        console.log("Error while getting user id", err);
        return res.status(500).json({ success: false, message: "DB error" });
      }

      if (userResult.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No user found for this user"
        });
      }

      const user_id = userResult[0].id;

      // 2. Check if review already exists
      connection.query(
        `SELECT id FROM reviews WHERE product_id = ? AND user_id = ?`,
        [productId, user_id],
        (err, reviewResult) => {

          if (err) {
            console.log("Error while checking existing review", err);
            return res.status(500).json({ success: false, message: "DB error" });
          }

          console.log("review query result", reviewResult);

          // ================= UPDATE =================
          if (reviewResult.length > 0) {

            // Update review text only
            if (rating === "") {
              connection.query(
                `UPDATE reviews 
                 SET review_text = ? 
                 WHERE product_id = ? AND user_id = ?`,
                [review, productId, user_id],
                (err, updateResult) => {

                  if (err) {
                    console.log("Error while updating review", err);
                    return res.status(500).json({ success: false, message: "DB error" });
                  }

                  console.log("update result", updateResult);

                  return res.status(201).json({
                    success: true,
                    message: "Review updated successfully",
                    data: updateResult
                  });
                }
              );

              return;
            } else{
              
            // Update rating only
            connection.query(
              `UPDATE reviews 
               SET rating = ? 
               WHERE product_id = ? AND user_id = ?`,
              [rating, productId, user_id],
              (err, updateResult) => {

                if (err) {
                  console.log("Error while updating rating", err);
                  return res.status(500).json({ success: false, message: "DB error" });
                }

                console.log("update result", updateResult);

                return res.status(201).json({
                  success: true,
                  message: "Rating updated successfully",
                  data: updateResult
                });
              }
            );

            return;
          }
            }


          // ================= INSERT =================
          if (rating === "") {

            // Insert review only
            connection.query(
              `INSERT INTO reviews (product_id, user_id, review_text) 
               VALUES (?, ?, ?)`,
              [productId, user_id, review],
              (err, insertResultReview) => {

                if (err) {
                  console.log("Error while inserting review", err);
                  return res.status(500).json({
                    success: false,
                    message: "DB error while saving review"
                  });
                }

                console.log("insert review result", insertResultReview);

                return res.status(201).json({
                  success: true,
                  message: "Review submitted successfully",
                  data: insertResultReview
                });
              }
            );

            return;
          }else{
            
          // Insert rating only
          connection.query(
            `INSERT INTO reviews (product_id, user_id, rating) 
             VALUES (?, ?, ?)`,
            [productId, user_id, rating],
            (err, insertResultRating) => {

              if (err) {
                console.log("Error while inserting rating", err);
                return res.status(500).json({
                  success: false,
                  message: "DB error while saving rating"
                });
              }

              console.log("insert rating result", insertResultRating);

              return res.status(201).json({
                success: true,
                message: "Rating submitted successfully",
                data: insertResultRating
              });
            }
          );
          }


        }
      );

    }
  );
};



// add to cart

export const addToCart=(req,res)=>{
    console.log("add to cart api", req.body);
    console.log("authenticated user in add to cart api", req.user);

    const productId=req.body.productId;
    const quantity=req.body.quantity;
    const userMobile=req.user.mobile;

    if(!productId){
      return res.status(400).json({
        success:false,
        message:"Product id is required"
      })
    }
    
    // 1. Get user id using mobile
    connection.query(
      `SELECT id FROM users WHERE mobile = ?`,
      [userMobile],
      (err, userResult) => {
        console.log("User query result in add to cart:", userResult);
        if (err) {
          console.log("Error while getting user id", err);
          return res.status(500).json({ success: false, message: "DB error" });
        }
        if (userResult.length === 0) {
          return res.status(400).json({
            success: false,
            message: "No user found for this user"
          });
        }
        const user_id = userResult[0].id; // user id from users table
        
        // 2. Check if product already in cart
               // i have done this in productDetails api

            // 3. Insert into cart
            connection.query(
              `INSERT INTO cart (user_id, product_id, product_quantity) VALUES (?, ?, ?)`,
              [user_id, productId, quantity],
              (err, insertResult) => {
                if (err) {
                  console.log("Error while adding to cart", err);
                  return res.status(500).json({ success: false, message: "DB error while adding to cart" });
                }
                console.log("Add to cart result", insertResult);
                return res.status(201).json({
                  success: true,
                  message: "Product added to cart successfully",
                  data: insertResult
                });
              }
            );
          }
        );
        

    

}


// Cart Count

export const cartCount=(req,res)=>{
  const userMobile=req.user.mobile;
connection.query(`SELECT id FROM users WHERE mobile = ?`,[userMobile],(err,userResult)=>{
  if(err){
    console.log("Error while getting user id for cart count", err);
    return res.status(500).json({ success: false, message: "DB error" });
  }
  if(userResult.length===0){
    return res.status(400).json({
      success:false,
      message:"No user found for this user"
    })
  }
  const user_id=userResult[0].id;
  connection.query(`SELECT COUNT(*) as count FROM cart WHERE user_id=?`,[user_id],(err,countResult)=>{
    if(err){
      console.log("Error while getting cart count", err);
      return res.status(500).json({ success: false, message: "DB error" });
    }
    console.log("Cart count result", countResult);
    res.status(200).json({
      success:true,
      cartCount:countResult[0].count
    })
  }
   )

}
)}


// get cart products for cart page

export const cartProducts=(req,res)=>{
  const userMobile=req.user.mobile;
  connection.query(`SELECT id FROM users WHERE mobile = ?`,[userMobile],(err,userResult)=>{
    if(err){
      console.log("Error while getting user id for cart products", err);
      return res.status(500).json({ success: false, message: "DB error" });
    }
    if(userResult.length===0){
      return res.status(400).json({
        success:false,
        message:"No user found for this user"
      })
    }
    const user_id=userResult[0].id;
    
    let query=`SELECT 
c.id AS cart_id,c.product_quantity as cart_quantity,
p.*,
(
  SELECT i.image_path 
  FROM product_images i 
  WHERE i.product_id = p.product_id 
  LIMIT 1
) AS image
FROM cart c
JOIN product p ON c.product_id = p.product_id
WHERE c.user_id = ?`
    connection.query(query,[user_id],(err,cartProductsResult)=>{
      if(err){
        console.log("Error while getting cart products", err);
        return res.status(500).json({ success: false, message: "DB error" });
      }
      res.status(200).json({
        success:true,
        data:cartProductsResult
      })
    })
  }

)}


// remove from cart
export const removeFromCart=(req,res)=>{
  const userMobile=req.user.mobile;
  const {cartId}=req.body;
  

     connection.query(`select id from users where mobile=?`,[userMobile],(err,userResult)=>{
      if(err){
        console.log("Error while getting user id for remove from cart", err);
        return res.status(500).json({ success: false, message: "DB error" });
      }
      if(userResult.length===0){
        return res.status(400).json({
          success:false,
          message:"No user found for this user"
        })
      }
      const user_id=userResult[0].id;
     
      connection.query(`delete from cart where id=? and user_id=?`,[cartId,user_id],(err,deleteResult)=>{
        if(err){
          console.log("Error while removing from cart", err);
          return res.status(500).json({ success: false, message: "DB error" });
        }
        res.status(200).json({
          success:true,
          message:"Product removed from cart successfully"
        })
      }
        )
      
})
}



// 


