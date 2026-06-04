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