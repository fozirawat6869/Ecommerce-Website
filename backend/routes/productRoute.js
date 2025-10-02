import express from 'express'
import {getAllProducts,createProduct,updateProduct,deleteProduct,getSingleProduct} from '../controllers/productController.js'

const router=express.Router();

// GET all products and Create Product
router.route('/products').get(getAllProducts).post(createProduct)

// updateProduct and delete product
router.route('/products/:id').put(updateProduct).delete(deleteProduct).get(getSingleProduct)


export default router