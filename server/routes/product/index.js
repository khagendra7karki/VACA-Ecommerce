import express from 'express'
import productController from '../../controller/product/index.js'

const productRouter = express.Router()


productRouter.get('/getProducts', productController.getProduct)
productRouter.get('/getProduct/:id', productController.getProductById )
productRouter.get('/getProducts/search', productController.getProductsForSearch )
productRouter.get('/getTopProducts', productController.getTopProducts )


//
// Yet to be tested 
//

// productRouter.delete('/deleteProduct/:id',productController.deleteProductById)
// productRouter.post( '/addProduct', productController.storeProduct)


export default productRouter