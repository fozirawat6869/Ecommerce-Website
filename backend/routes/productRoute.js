import express from 'express'
import {getAllProducts,test,createProduct,productDetails,newlyAddedProducts,categoryProducts} from '../controllers/productController.js'
// import { test } from '../controllers/productController.js';

const router=express.Router();

router.route('/newlyAddedProducts').get(newlyAddedProducts)

// GET all products and Create Product
router.route('/products').get(getAllProducts).post(createProduct)

router.route('/test').get(test)

// updateProduct and delete product
 router.route('/products/:id').get(productDetails)
 // .put(updateProduct).delete(deleteProduct).get(getSingleProduct)


 // Category filtered products
router.route('/productsCategory').get(categoryProducts)  

export default router