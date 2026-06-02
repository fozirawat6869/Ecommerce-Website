
import HandleError from '../utils/handleErrors.js'
import handleAsyncErrors from '../middleware/handleErrorAsync.js'
import connection from '../config/sqldb.js'
import dotenv from 'dotenv';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


dotenv.config({ path: './config/config.env' });




// All Products 

export const getAllProducts = handleAsyncErrors(async (req, res, next) => {
  console.log("all products");
  console.log(req.query);

  let { category, price, size, page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);
  let offset = (page - 1) * limit;

  let query = `
    SELECT p.*,
    (SELECT pi.image_path 
     FROM product_images pi 
     WHERE pi.product_id = p.product_id 
     LIMIT 1) as image
    FROM product p
    JOIN category c ON p.product_category_id = c.id
    WHERE 1=1
  `;

  let params = [];

  // CATEGORY FILTER
  if (category) {
    query += ` AND LOWER(c.name) = LOWER(?)`;
    params.push(category);
  }

  // PRICE FILTER
  if (price) {
    if (["100","200","300","400","500","1000"].includes(price)) {
      query += ` AND p.product_price <= ?`;
      params.push(Number(price));
    } else if (price === "1000plus") {
      query += ` AND p.product_price >= ?`;
      params.push(1000);
    }
  }

  // PAGINATION
  query += ` LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  connection.query(query, params, (err, result) => {
    if (err) {
      console.log(err);
      return next(new HandleError("error in query of allProducts", 400));
    }

    res.status(200).json({
      success: true,
      allProduct: result
    });
  });
});




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

export const productDetails = (req, res,next) => {

  const reviewPage = parseInt(req.query.reviewPage) || 1;
  const reviewLimit = parseInt(req.query.reviewLimit) || 2;
  const reviewOffset = (reviewPage - 1) * reviewLimit;

  const { id } = req.params;
  console.log(req.user)
const userMobile = req.user?.mobile;



  // 1. Get product
  connection.query(`select * from product where product_id=?`, [id], (err, result) => {

    if (err) {
      return next()
      // res.status(500).json({ success: false, message: "Error in product query" });
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

          if (!userMobile) {
  return res.status(200).json({
    success: true,
    productDetail: result[0],
    images: images.map(img => img.image_path),
    reviews: reviewsResult,
    inCart: false
  });
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

export const newlyAddedProducts = (req, res, next) => {

  try {
    console.log("QUERY PARAMS:", req.query);

    let { page, limit } = req.query;

    // ✅ convert safely
    page = Number(page) || 1;
    limit = Number(limit) || 8;

    const offset = (page - 1) * limit;

    const query = `
      SELECT p.*,
      (
        SELECT i.image_path 
        FROM product_images i 
        WHERE i.product_id = p.product_id 
        LIMIT 1
      ) AS main_image
      FROM product p
      WHERE p.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;

    connection.query(query, [limit, offset], (err, result) => {

      console.log("Newly Added Products Query Result:", result);

      // ❌ DB error → send to error middleware
      if (err) {
        console.log("DB ERROR:", err);
        return next(new HandleError("Error in newly added products query", 500));
      }

      // ✅ success
      res.status(200).json({
        success: true,
        newlyAddedProducts: result || []
      });

    });

  } catch (error) {
    // ❌ unexpected error
    console.log("SERVER ERROR:", error);
    return next(new HandleError("Server error", 500));
  }
};



// api for frontend to show the categories in ui


export const categories=(req,res)=>{
   connection.query("select * from category",(err,result)=>{
     console.log(result)
     if(err){
      return next(new HandleError("error in category api",500))
     }
     res.status(200).json({
      success:true,
      categories:result
     })
   })
}






export const inputSearch = (req,res,next) => {
  const search = req.query.search;
  

  console.log("BACKEND SEARCH:", search);

  // ❌ empty search → return empty
  if (!search || search.trim() === "") {
    return res.json({
      success: true,
      allProduct: []
    });
  }

  const searchTerm = `%${search.toLowerCase()}%`;

  connection.execute(
    `SELECT p.* ,(select image_path from product_images where product_id=p.product_id limit 1) as image FROM product p
     WHERE LOWER(p.product_name) LIKE ? 
     OR LOWER(p.product_description) LIKE ?`,
    [searchTerm, searchTerm],
    (err, result) => {
      if (err) {
        console.log("Error:", err);
          return next(
          new HandleError(
            "Error while searching products",
            500
          )
        );
        // res.status(500).json({ success: false });
      }

      console.log("FILTERED RESULT:", result);

      res.json({
        success: true,
        products: result
      });
    }
  );
};


//  Total count of products 

export const getProductCount = async (req, res) => {
  connection.query(
    "SELECT COUNT(*) as total FROM product",
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false });
      }

      res.json({
        success: true,
        total: result[0].total
      });
    }
  );
};



// for payment section to get the product details with price and name

export const getPaymentProductDetails=(req,res,next)=>{
  console.log("Getting product details for payment section");
  const {id}=req.params;
  // console.log("Product ID for payment details:", id);

  const query=`select *, (select image_path from product_images where product_id=product.product_id limit 1 ) as image from product  where product_id=?`
    
  connection.query(query,[id],(err,result)=>{
    console.log("Payment Product Details Result:", result);
    if(err){
      console.log("Error in payment product details query:", err);
      return next(new HandleError("Error fetching product details for payment", 500));
    }
      if (result.length === 0) {
      return next(new HandleError("Product not found", 404));
    }
      res.status(200).json({
    success:true,
    product:result[0]
  })

  })


}