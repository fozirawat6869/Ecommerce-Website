import express from 'express'
import {getAllProducts,createProduct,productDetails,newlyAddedProducts} from '../controllers/productController.js'


const router=express.Router();

router.route('/newlyAddedProducts').get(newlyAddedProducts)

// GET all products and Create Product
router.route('/products').get(getAllProducts).post(createProduct)

// updateProduct and delete product
 router.route('/products/:id').get(productDetails)
 // .put(updateProduct).delete(deleteProduct).get(getSingleProduct)


export default router