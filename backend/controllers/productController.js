
import HandleError from '../utils/handleErrors.js'
import handleAsyncErrors from '../middleware/handleErrorAsync.js'
import connection from '../config/sqldb.js'


export const getAllProducts=handleAsyncErrors(async(req,res,next)=>{
    connection.query("select * from products",(err,result)=>{
    // if(err){
    //   return res.status(400).json({
    //      success:false,
    //      message:"error in query",   
    //   })
    // }
     if(err){
      return next(new HandleError("error in query of allProducts",400))
     }
    res.status(200).json({
      success:true,
      allProduct:result
    })
  })
  
})



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
