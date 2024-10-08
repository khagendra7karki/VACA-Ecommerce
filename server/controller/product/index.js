import mongoose from "mongoose";
import Product from "../../models/Product.js"


const productController = {
    getProducts : async (req, res) => {

        try{
            const pageSize = 8;
            const page = Number(req.query.pageNumber) || 1;
          
            const keyword = req.query.keyword
              ? {
                  name: {
                    $regex: req.query.keyword,
                    $options: "i",
                  },
                }
              : {};
            const count = await Product.countDocuments()
            const products = await Product.find(keyword)
            .limit(pageSize)
            .skip(pageSize * (page - 1));
          
            res.status(200).json( {payload : { products, page, pages: Math.ceil(count / pageSize) }});
        }
        catch( error ){
            console.log('An error from productController.js occurred', error)
            res.status(500).send()
        }
    },

    updateProduct: async ( req, res) =>{
        try{
            const { id } = req.params
            const product = await Product.findById( id ).lean()
            if( product ){
                product.title = req.body.title
                product.description = req.body.description
                product.price = req.body.price
                product.category = req.body.category
                product.images = req.body.images

                const updatedProduct = await product.save()
                res.send(updatedProduct)
            }
        }catch( error ){
            console.log( 'An error occurred', error)

        }
    },

    deleteProductById: async( req, res) =>{
        const { id } = req.params
        try{
            await Product.deleteOne( { _id: new mongoose.Types.ObjectId( id ) })
            res.status( 200).json( { task: 'deleteItem', status: 'successful'})
        }
        catch( error ){
            console.log( 'An error occurred', error)
        }
    },

    /**
     *
     * sends the user info
     * along with the review
     *  
     */
    getProductByIdWithReview: async( req, res) =>{    
        try{

            const { id } = req.params
            // res.status(500).json({message: 'An error occurred'})
            const product = await Product.findById( id ).lean()
            res.status(200).json( {task : 'getProductId',status:'unsuccessful', payload: product })

        }catch( error ){
            console.log( 'An error occcurred at getproductByIdWithReview',error )
            return res.status( 500 ).json( { task: 'getProductByIdWithReview',status: 'unsuccessful',  reason: error })

        }
    },

    storeProduct: async( req, res) =>{
        
        console.log("New Product received")
        
        try {
            const {product} = req.body
            console.log( "New product is to be saved to the database")
            console.log( req.body )
            const producttModel = new  Product( product)
            await producttModel.save()
            res.status(200).json({ task: res.status(200).json({ task: 'createProduct', status: 'successful'})})
        }catch( error ){
            console.log ( error )
            return res.status( 500 ).json( { task: 'createProduct',status: 'unsuccessful',  reason: error })
        }
    },

    getTopProducts:async (req, res ) => {
        try{
            const result = await Product.find({}).sort({ rating: -1}).limit( 20 ).lean()
            res.status(200).json({ task: 'createProduct', status: 'successful', payload: result })
        }catch( error ){
            console.log ( error )
            return res.status( 500 ).json( { task: 'createProduct',status: 'unsuccessful',  reason: error })
        }

    },
    getLatestProducts : async( req, res ) => {
        try{
            const result = await Product.find({}).sort({ createdAt: -1}).limit( 20 ).lean()
            res.status(200).json({ task: 'createProduct', status: 'successful', payload: result })
        }catch( error ){
            console.log ( error )
            return res.status( 500 ).json( { task: 'createProduct',status: 'unsuccessful',  reason: error })
        }
    },

    getProductsForSearch : async(req, res) => {
        try{
            const keyword = req.query.keyword
                ? {
                    title: {
                    $regex: req.query.keyword,
                    $options: "i",
                    },
                }
                : {};
            
            const products = await Product.aggregate([
                {$match: keyword },
                {
                    $project:{ 
                        _id: 0,
                        value : '$_id',
                        label : '$title'}
                }
            ]);
            
            res.status(200).send({ task: 'getProductsSearch', status: 'successsful', payload: products})

        }catch( error ){
            console.log('An error occurred at getProductsForSearch', error)
            return res.status(500).json({task: 'getProductsForSearch', status: 'unsuccessful', reason: 'Internal Server Error'})
        }
    } 
}

export default productController