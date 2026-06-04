import connection from '../config/sqldb.js'
import HandleError from '../utils/handleErrors.js'

export const placeOrder=(req,res,next)=>{
    console.log("inside the palce order api")
    console.log("Placing order with data:", req.body);
    const { address_id, product_id, quantity, price, total_price, payment_method, payment_status, order_status } = req.body;
    const {mobile} = req.user; // Assuming you have user authentication and the user ID is available in req.user

    console.log("Authenticated user mobile in place order API:", mobile);
}