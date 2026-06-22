import connection from '../config/sqldb.js'
import HandleError from '../utils/handleErrors.js'

export const placeOrder=(req,res,next)=>{
    console.log("inside the palce order api")
    console.log("Placing order with data:", req.body);
    const { address_id, product_id, quantity, price, total_price, payment_method, payment_status, order_status } = req.body;
    const {mobile} = req.user; // Assuming you have user authentication and the user ID is available in req.user


    
   connection.query(
    `SELECT id FROM users WHERE mobile = ?`,
    [mobile],
    (err, userResult) => {

        console.log("User query result in place order:", userResult);

        if (err) {
            console.log("Error while getting user id in place order", err);
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
        const user_id = userResult[0].id;  // get the user id from the query result

        // Now you have the user_id, you can proceed to insert the order into the database

        connection.query('insert into orders (user_id, address_id, product_id, quantity, price, total_price, payment_method, payment_status, order_status) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [user_id, address_id, product_id, quantity, price, total_price, payment_method, payment_status, order_status],
        (err, result) => {
            if (err) {
                console.log("Error while placing order", err);
                return next(
                    new HandleError(
                        "DB error while placing order",
                        500
                    )
                );
            }
            console.log("Order placed successfully:", result);

            res.status(200).json({
                success: true,
                message: "Order placed successfully",
                orderId: result.insertId // You can return the inserted order ID if needed
            });
        }
    )

      
})
}


// show orders for a user


export const showOrders=(req,res,next)=>{
  
    const {mobile} = req.user; // Assuming you have user authentication and the user ID is available in req.user
   console.log("Fetching orders for user with mobile:", mobile);
    connection.query('SELECT id FROM users WHERE mobile = ?', [mobile], (err, userResult) => {
        if (err) {
            console.log("Error while getting user id in show orders", err);
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
        const user_id = userResult[0].id;  // get the user id from the query result


         const query=`
  select 
  o.*,p.product_name,p.product_description , 
  (select image_path from product_images where product_id=p.product_id limit 1) as image_path
  from orders o 
  join product p 
  on p.product_id=o.product_id
 
  where o.user_id=? 
  order by o.created_at desc
  
  `


        connection.query(query, [user_id], (err, ordersResult) => {
            if (err) {
                console.log("Error while fetching orders", err);
                return next(
                    new HandleError(
                        "DB error while fetching orders",
                        500
                    )
                );
            }
            console.log("Orders fetched successfully:", ordersResult);

            res.status(200).json({
                success: true,
                message: "Orders fetched successfully",
                orders:ordersResult
            });
        });
    });
}




//  Cancel order 


export const cancelOrder=(req,res,next)=>{

    const { id } = req.params; // Get the order ID from the request parameters
console.log("Cancelling order with id:", id);
    connection.query( "UPDATE orders SET order_status = ? WHERE id = ?",
  ["cancelled", id],(err,result)=>{
        if(err){
            console.log("Error while cancelling order", err);
            return next(
                new HandleError(
                    "DB error while cancelling order",
                    500
                )
            );
        }
        console.log("Order cancelled successfully:", result);

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
        });
    }
    )

}


// Get order details by order ID

export const getOrderDetails=(req,res,next)=>{
    console.log('inside get order details api');
    const { id } = req.params; // Get the order ID from the request parameters
    console.log("Fetching details for order with id:", id);

    const query=`
    SELECT
    o.id AS order_id,
    o.created_at AS order_date,

    p.*,

    o.user_id,
    o.address_id,
    o.product_id,
    o.quantity,
    o.price,
    o.total_price,
    o.payment_method,
    o.payment_status,
    o.order_status,

    ad.id AS address_table_id,
    ad.full_name,
    ad.mobile,
    ad.pincode,
    ad.state,
    ad.city,
    ad.addres,

    (
      SELECT image_path
      FROM product_images pi
      WHERE pi.product_id = p.product_id
      LIMIT 1
    ) AS image_path

FROM orders o
JOIN product p ON p.product_id = o.product_id
JOIN address ad ON ad.id = o.address_id
WHERE o.id = ?
    `
    connection.query(query,[id],(err,result)=>{
        if(err){
            console.log("Error while fetching order details", err);
            return next(
                new HandleError(
                    "DB error while fetching order details",
                    500
                )
            );
        }
        console.log("Order details fetched successfully:", result);

        res.status(200).json({
            success: true,
            message: "Order details fetched successfully",
            orderDetails:result[0] // Assuming the query returns a single order detail
        });
        
    }
    )
}




// total order for admin

export const totalOrders=(req,res,next)=>{
      connection.query(`select id from orders`,(err,result)=>{
        if(err){
            console.log("error while fetching total orders for admin homepage",err)
            return next( new HandleError(
                    "DB error while fetching order details",
                    500
                ))
        }
        res.status(200).json({
            success:true,
            message:"total orders fetched successfully",
            allOrders:result
        })
      })
}



// show all orders for admin 

export const allOrdersAdmin=(req,res,next)=>{
   const query = `
  SELECT
    o.*,
    p.product_name,
    p.product_description,
    p.product_price,
    (
      SELECT image_path
      FROM product_images pi
      WHERE pi.product_id = p.product_id
      LIMIT 1
    ) AS image_path
  FROM orders o
  JOIN product p
    ON o.product_id = p.product_id
  ORDER BY o.id DESC
`;
    connection.query(query,(err,result)=>{
        if(err){
            console.log("error while fetching all orders for admin homepage",err)
            return next( new HandleError(
                    "DB error while fetching order details",
                    500
                ))
        }
        res.status(200).json({
            success:true,
            message:"all order for admin fetched",
            allData:result
        })
    })
}


// Update Order Status for admin

export const updateOrderStatus = (req, res, next) => {
  const { id } = req.params;
  const { order_status } = req.body;

  const query = `
    UPDATE orders
    SET order_status = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [order_status, id],
    (err, result) => {
      if (err) {
        return next(
          new HandleError(
            "DB error while updating order status",
            500
          )
        );
      }

      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
      });
    }
  );
};



// update payment status 

export const updatePaymentStatus = (req, res, next) => {
  const { id } = req.params;
  const { payment_status } = req.body;

  const query = `
    UPDATE orders
    SET payment_status = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [payment_status, id],
    (err, result) => {
      if (err) {
        return next(
          new HandleError(
            "DB error while updating payment status",
            500
          )
        );
      }

      res.status(200).json({
        success: true,
        message: "Payment status updated successfully",
      });
    }
  );
};



// total revenue

export const getTotalRevenue = (req, res, next) => {
  const query = `
    SELECT COALESCE(SUM(total_price), 0) AS totalRevenue
    FROM orders
    WHERE payment_status = 'completed'
  `;

  connection.query(query, (err, result) => {
    if (err) {
      return next(
        new HandleError(
          "Failed to fetch total revenue",
          500
        )
      );
    }

    res.status(200).json({
      success: true,
      totalRevenue: result[0].totalRevenue,
    });
  });
};