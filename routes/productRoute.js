import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCoutnController, productFiltersContoller, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
import braintree from 'braintree';

const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get products
router.get('/get-product', getProductController);

//single products
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid', deleteProductController)

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// filter product
router.post('/product-filters', productFiltersContoller)

//product cound
router.get('/product-count', productCoutnController)

//product per page
router.get('/product-list/:page', productListController)

//Search product
router.get('/search/:keyword', searchProductController);

//similar product
router.get('/related-product/:pid/:cid', relatedProductController)

//category wise product
router.get('/product-category/:slug', productCategoryController)

//rating 
// router.post('/product-rating/', ratingController)

//payment route
router.post('/braintree/payment', requireSignIn, braintreePaymentController)
//token payment
router.get('/braintree/token', braintreeTokenController)

export default router