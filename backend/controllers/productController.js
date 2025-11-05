
import HandleError from '../utils/handleErrors.js'
import handleAsyncErrors from '../middleware/handleErrorAsync.js'
import connection from '../config/sqldb.js'


export const getAllProducts=handleAsyncErrors(async(req,res,next)=>{
  // console.log(req.query)  get the page,limit form query
  let category=req.query.category;
  console.log(category)
   let page = parseInt(req.query.page) || 1;   // if no page given, use 1
  let limit = parseInt(req.query.limit) ||2; // if no limit given, use 2
   let offset = (page - 1) * limit;
   let query="select * from products"
  //   if category is there in query
      if(category){
        query+=` where category = "${category}" || ""`
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


export const productDetails=(req,res)=>{

 
  const {id}=req.params
  console.log(id)
  connection.query("select * from products where product_id=?",[id],(result,err)=>{
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


