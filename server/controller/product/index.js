import mongoose from "mongoose";
import productSchema from "../../models/productSchema.js"
import userModel from "../../models/userSchema.js";

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
          
            const count = await productSchema.countDocuments({ ...keyword });
            const products = await productSchema.find({ ...keyword })
              .limit(pageSize)
              .skip(pageSize * (page - 1));
          
            res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
            
            // const products = await productSchema.find({}).limit( 20 )
            // res.status(200).json({ task: 'getProduct', status:'successful', payload: products})
        }
        catch( error ){
            console.log('An error from productController.js occurred', error)
        }
    },

    updateProduct: async ( req, res) =>{
        try{
            const { id } = req.params
            const product = await productSchema.findById( id ).lean()
            if( product ){
                product.title = req.body.title
                product.description = req.body.description
                product.price = req.body.price
                product.category = req.body.category
                product.image = req.body.image

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
            await productSchema.deleteOne( { _id: new mongoose.Types.ObjectId( id ) })
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
            const product = await productSchema.findById( id ).lean()
            const userIds = product.review.reviews.map( ( review ) => review.userId )

            

            // get the users' info
            const associatedUsers = await userModel.find( { _id: {$in : userIds} }).lean()

            //
            // group user and product review
            // that consists the same value
            //

            for ( const review of product.review.reviews ){
                // console.log( associatedUsers  )
                const user = associatedUsers.find( user => user._id.equals( review.userId))
                review.fullName = user?.fullName
            }
            console.log( product.rating )
            res.status(200).json( {task : 'getProductId',status:'unsuccessful', payload: product })

        }catch( error ){
            console.log( 'An error occcurred at getproductByIdWithReview',error )
            return res.status( 500 ).json( { task: 'getProductByIdWithReview',status: 'unsuccessful',  reason: error })

        }
    },
    storeProduct: async( req, res) =>{
        
        console.log("New Product received hhhhhh")
        
        try {
            const {product} = req.body
            console.log( "New product is to be saved to the database")
            console.log( req.body )
            const producttModel = new  productSchema( product)
            await producttModel.save()
            res.status(200).json({ task: 'createProduct', status: 'successful'})
        }catch( error ){
            console.log ( error )
            return res.status( 500 ).json( { task: 'createProduct',status: 'unsuccessful',  reason: error })
        }
    },
    getTopProducts:async (req, res ) => {
        try{
            const result = await productSchema.find({}).sort({ rating: -1}).limit( 20 ).lean()
            res.status(200).json({ task: 'createProduct', status: 'successful', payload: result })
        }catch( error ){
            console.log ( error )
            return res.status( 500 ).json( { task: 'createProduct',status: 'unsuccessful',  reason: error })
        }

    },
    getProductsForSearch : async(req, res) => {
    const keyword = req.query.keyword
        ? {
            title: {
            $regex: req.query.keyword,
            $options: "i",
            },
        }
        : {};
    const products = await productSchema.find({ ...keyword });
    const formattedProducts = [];
    
    products.map((product) => {
        formattedProducts.push({
        value: product._id,
        label: product.title,
        });
    });
    res.json(formattedProducts);
    } 
}

export default productController