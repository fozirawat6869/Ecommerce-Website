import productSchema from '../models/prodectModel.js'

// get all products
export  const getAllProducts=async(req,res)=>{
    // res.status(200).json("get all Products")
    const allProduct=await productSchema.find()
    res.status(200).json({
      success:true,
      allProduct:allProduct
    })

}

// create product
export const createProduct=async(req,res)=>{
    console.log(req.body)
    // res.status(201).json("product created")
  const product=await productSchema.create(req.body)
 
  res.json({
    success:true,
    createdProduct:product
  })
  
}

// update product
export const updateProduct=async(req,res)=>{
   const id=req.params.id
 
  console.log(id)
  const updateProduct=await productSchema.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidators:true   // to run the validation again
  },)
  console.log(updateProduct)
  res.status(200).json({
    success:true,
    updatedProduct:updateProduct
  })
}

// delete product
export const deleteProduct=async(req,res)=>{
  const id=req.params.id
  console.log
   const deleteProduct=await productSchema.deleteOne({_id:id})
   console.log(deleteProduct)
   res.status(200).json({
    success:true,
    message:"Product deleted successfully",
    deleteProduct
   })
}

// get single product
export const getSingleProduct=async(req,res)=>{
    // const id=req.params.id
    const id = req.params.id.trim();
    const singleProduct=await productSchema.findOne({_id:id})
    if(!singleProduct){
      return res.status(404).json({
        success:false,
        message:"Product not found"
      })}

    res.status(200).json({
      success:true,
      singleProduct
    })
  
}