import express from 'express'
import {getAllProducts,createProduct,productDetails
  ,newlyAddedProducts,categoryProducts
      , categories, inputSearch } from '../controllers/productController.js'

import { sendOTP,verifyOTP,loginOTP } from '../controllers/authController.js'
import { userProfile,updateUserProfile,
         reUpdateProfile,allUsers,getAddress,addAddress } from '../controllers/userController.js'
import { adminLogin,deleteProduct } from '../controllers/adminController.js'
import { addToCart,cartCount,cartProducts,removeFromCart } from '../controllers/cartController.js'
import { reviews } from '../controllers/reviewsController.js'
import upload from '../config/multer.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
import {globalLimiter,authLimiter,otpLimiter} from '../middleware/rateLimiter.js'
import optionalAuth from '../middleware/optionalIsAuthentication.js'

const router=express.Router();

router.route('/newlyAddedProducts').get(newlyAddedProducts)

// GET all products and Create Product
router.route('/products').get(getAllProducts).post(createProduct)

// router.route('/test').get(test)

// updateProduct and delete product
 router.route('/products/:id').get(optionalAuth,productDetails)
 // .put(updateProduct).delete(deleteProduct).get(getSingleProduct)


 // Category filtered products
router.route('/productsCategory').get(categoryProducts)  


// user register
router.route('/registerr').post(otpLimiter,sendOTP)
router.route('/verifyOTP').post(otpLimiter,verifyOTP) 


// user login
router.route('/login').post(authLimiter,loginOTP)

router.route('/categories').get(categories)

router.route('/createProduct').post(upload.array("images",4),createProduct)
// or
// router.post("/createProduct", upload.single("image"), createProduct);


// user profile
router.route('/userProfile').get(isAuthenticated,userProfile).post(isAuthenticated,updateUserProfile)

// router.route('/updateUserProfile').post(updateUserProfile)
// update user profile
router.post('/reUpdateProfile', isAuthenticated, reUpdateProfile);

router.route('/review').post(isAuthenticated,reviews)

router.route('/addToCart').post(isAuthenticated,addToCart)

// cart count
router.route('/cartCount').get(isAuthenticated,cartCount)

// cart products
router.route('/cartProducts').get(isAuthenticated,cartProducts)


// remove from cart
router.route('/removeFromCart').post(isAuthenticated,removeFromCart)


// admin login with email and password
router.route('/adminLogin').post(adminLogin)

// get all users for admin
router.route('/allUsers').get(allUsers)

// get product through input search
router.route('/inputSearch').get(inputSearch)


router.route('/deleteProduct/:id').delete(deleteProduct)


// get address 
router.route('/getAddress').get(isAuthenticated,getAddress)

// add Address
router.route('/addAddress').post(isAuthenticated,addAddress)

export default router