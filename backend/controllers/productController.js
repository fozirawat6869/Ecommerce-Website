
import HandleError from '../utils/handleErrors.js'
import handleAsyncErrors from '../middleware/handleErrorAsync.js'
import connection from '../config/sqldb.js'


export const getAllProducts=handleAsyncErrors(async(req,res,next)=>{
  // console.log(req.query)  get the page,limit form query
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



// export const getAllProducts = handleAsyncErrors(async (req, res, next) => {
//   let {
//     category,
//     brand,
//     size,
//     color,
//     type,
//     ram,
//     storage,
//     minPrice,
//     maxPrice,
//     page,
//     limit
//   } = req.query;

//   // Default pagination
//   page = parseInt(page) || 1;
//   limit = parseInt(limit) || 10;
//   let offset = (page - 1) * limit;

//   // Base Query
//   let query = `SELECT * FROM products WHERE 1=1`;

//   // ----------------------------
//   //   APPLY FILTERS IF PRESENT
//   // ----------------------------

//   // CATEGORY FILTER
//   if (category) {
//     query += ` AND category = "${category}"`;
//   }

//   // BRAND FILTER
//   if (brand) {
//     query += ` AND brand = "${brand}"`;
//   }

//   // SIZE (Men/Women clothing)
//   if (size) {
//     query += ` AND size = "${size}"`;
//   }

//   // COLOR
//   if (color) {
//     query += ` AND color = "${color}"`;
//   }

//   // TYPE (Bluetooth / Wired / Wireless / DSLR etc.)
//   if (type) {
//     query += ` AND type = "${type}"`;
//   }

//   // RAM (Mobiles)
//   if (ram) {
//     query += ` AND ram = "${ram}"`;
//   }

//   // STORAGE (Mobiles)
//   if (storage) {
//     query += ` AND storage = "${storage}"`;
//   }

//   // PRICE RANGE
//   if (minPrice) {
//     query += ` AND price >= ${minPrice}`;
//   }
//   if (maxPrice) {
//     query += ` AND price <= ${maxPrice}`;
//   }

//   // PAGINATION
//   query += ` LIMIT ${limit} OFFSET ${offset}`;

//   // RUN SQL QUERY
//   connection.query(query, (err, result) => {
//     if (err) {
//       console.log(err);
//       return next(new HandleError("Error in product query", 400));
//     }

//     res.status(200).json({
//       success: true,
//       products: result,
//     });
//   });
// });





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

// for show newly added product in home page in main

export const newlyAddedProducts=(req,res)=>{
  // let datys=15
  // console.log(req.query) get the page and limit from query
  let {page,limit}=req.query;
  page=Number(page)||1
  limit=Number(limit)||8
  let offset=(page-1)*limit
    connection.query(`select * from products where created_at >= DATE_SUB(NOW(),INTERVAL 15 DAY) order by created_at desc limit ${limit} offset ${offset}`,(err,result)=>{
    if(err){
      return next(new HandleError("error in query of newly added products",400))
    }
    res.status(200).json({
      success:true,
      newlyAddedProducts:result
    }) 
  })
}




