
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



export const categoryProducts = handleAsyncErrors(async (req, res, next) => {
  const {
    category,
    price,
    size,
    color,
    brand,
    type,
    ram,
    storage,
    screenSize,
    page = 1,
    limit = 10
  } = req.query;
  console.log(req.query);

  let offset = (page - 1) * limit;

  // Start building query
  let query = "SELECT * FROM products WHERE 1=1";
  let params = [];

  // Category filter
  if (category) {
    query += " AND category = ?";
    params.push(category);
  }

  // Price filter
  if (price) {
    if (price === "1000plus") {
      query += " AND price >= ?";
      params.push(1000);
    } else {
      query += " AND price <= ?";
      params.push(parseInt(price));
    }
  }

  // Optional dynamic filters
  if (size) {
    query += " AND size = ?";
    params.push(size);
  }

  if (color) {
    query += " AND color = ?";
    params.push(color);
  }

  if (brand) {
    query += " AND brand = ?";
    params.push(brand);
  }

  if (type) {
    query += " AND type = ?";
    params.push(type);
  }

  if (ram) {
    query += " AND ram = ?";
    params.push(ram);
  }

  if (storage) {
    query += " AND storage = ?";
    params.push(storage);
  }

  if (screenSize) {
    query += " AND screenSize = ?";
    params.push(screenSize);
  }

  // Pagination
  query += " LIMIT ? OFFSET ?";
  params.push(parseInt(limit), offset);

  // Execute query
  connection.query(query, params, (err, result) => {
    if (err) {
      console.log(err);
      return next(new HandleError("Error fetching products", 400));
    }
    res.status(200).json({
      success: true,
      allProduct: result,
    });
  });
});




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


// Get product details by ID
// export const productDetails = (req, res) => {
//   const { id } = req.params;

//   const query = "SELECT * FROM products WHERE product_id = ?";

//   connection.query(query, [id], (err, result) => {
//     if (err) {
//       console.log("Error in query of product details:", err);
//       return res.status(500).json({ success: false, message: "Database query failed" });
//     }

//     if (result.length === 0) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.status(200).json({
//       success: true,
//       productDetail: result[0],
//     });
//   });
// };

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




