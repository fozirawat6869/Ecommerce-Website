


import connection from "../config/sqldb.js";
import HandleError from "../utils/handleErrors.js";


// add to cart

export const addToCart = (req, res, next) => {

    console.log("add to cart api", req.body);
    console.log("authenticated user in add to cart api", req.user);

    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const userMobile = req.user.mobile;

    if (!productId) {
        return next(
            new HandleError(
                "Product id is required",
                400
            )
        );
    }

    // 1. Get user id using mobile
    connection.query(
        `SELECT id FROM users WHERE mobile = ?`,
        [userMobile],
        (err, userResult) => {

            console.log("User query result in add to cart:", userResult);

            if (err) {
                console.log("Error while getting user id", err);

                return next(
                    new HandleError(
                        "DB error",
                        500
                    )
                );
            }

            if (userResult.length === 0) {
                return next(
                    new HandleError(
                        "No user found for this user",
                        404
                    )
                );
            }

            const user_id = userResult[0].id;

            // 2. Check if product already in cart
            // i have done this in productDetails api

            // 3. Insert into cart
            connection.query(
                `INSERT INTO cart (user_id, product_id, product_quantity) VALUES (?, ?, ?)`,
                [user_id, productId, quantity],
                (err, insertResult) => {

                    if (err) {
                        console.log("Error while adding to cart", err);

                        return next(
                            new HandleError(
                                "DB error while adding to cart",
                                500
                            )
                        );
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
};



// Cart Count

export const cartCount = (req, res, next) => {

  const userMobile = req.user.mobile;

  connection.query(
    `SELECT id FROM users WHERE mobile = ?`,
    [userMobile],
    (err, userResult) => {

      if (err) {
        console.log("Error while getting user id for cart count", err);

        return next(
          new HandleError(
            "DB error while getting user",
            500
          )
        );
      }

      if (userResult.length === 0) {
        return next(
          new HandleError(
            "No user found for this user",
            404
          )
        );
      }

      const user_id = userResult[0].id;

      connection.query(
        `SELECT COUNT(*) as count FROM cart WHERE user_id=?`,
        [user_id],
        (err, countResult) => {

          if (err) {
            console.log("Error while getting cart count", err);

            return next(
              new HandleError(
                "DB error while getting cart count",
                500
              )
            );
          }

          console.log("Cart count result", countResult);

          res.status(200).json({
            success: true,
            cartCount: countResult[0].count
          });
        }
      );
    }
  );
};



// get cart products for cart page

export const cartProducts = (req, res, next) => {

  const userMobile = req.user.mobile;

  connection.query(
    `SELECT id FROM users WHERE mobile = ?`,
    [userMobile],
    (err, userResult) => {

      if (err) {
        console.log("Error while getting user id for cart products", err);

        return next(
          new HandleError(
            "DB error while getting user",
            500
          )
        );
      }

      if (userResult.length === 0) {
        return next(
          new HandleError(
            "No user found for this user",
            404
          )
        );
      }

      const user_id = userResult[0].id;

      let query = `SELECT 
c.id AS cart_id,
c.product_quantity as cart_quantity,
p.*,
(
  SELECT i.image_path 
  FROM product_images i 
  WHERE i.product_id = p.product_id 
  LIMIT 1
) AS image
FROM cart c
JOIN product p ON c.product_id = p.product_id
WHERE c.user_id = ?`;

      connection.query(
        query,
        [user_id],
        (err, cartProductsResult) => {

          if (err) {
            console.log("Error while getting cart products", err);

            return next(
              new HandleError(
                "DB error while getting cart products",
                500
              )
            );
          }

          res.status(200).json({
            success: true,
            data: cartProductsResult
          });
        }
      );
    }
  );
};



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


