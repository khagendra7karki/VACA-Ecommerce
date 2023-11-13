/**
 * TODO
 * 
 * Every function is doing the similar 
 * task. So extract those logic into a function
 * to decompose the code
 * 
 */
import mongoose from 'mongoose'
import userSchema from "../../models/User.js";
import productSchema from '../../models/Product.js'
const cartController = {

    /**
     * adds item to the cart
     * 
     */
    addItem: async ( req, res ) =>{
        try{
            const userId = res.locals.user._id;

            const { id , qty } = req.params;
            //find the product from the database
            let product = await productSchema.findById( id ).lean()

            let user = await userSchema.findByIdAndUpdate(userId, {
                $push: { "cart": { product: product._id, price: product.price, title: product.title, image: product.image[0], quantity: qty } }
            }, { new: true }).lean();

            if( !user ) return res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})

            console.log( user.cart )
            return res.status(200).json({status: 'successful', task: 'addItem', payload: user.cart })
        }
        catch( error ){
            console.log('Error while pushing item to cart', error );
            res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})
        }

    },
    /**
     * 
     * Removes item from the cart
     * 
     */
    removeItem: async ( req, res ) =>{
        try{
            const userId = res.locals.user._id;
            const { id } = req.params   // product Id
            let user = await userSchema.findByIdAndUpdate(userId, {
                $pull: {"cart": {"product": id }},
            },{ new: true }).lean();

            if( !user ) return res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})

            return res.status(200).json({status: 'successful', task: 'addItem', payload: user.cart })
        }
        catch( error ){
            console.log('Error while pushing item to cart', error );
            res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})
        }

    },
    
    /**
     * 
     * requires the new cart item
     * 
     * TODO 
     * 
     * check if the required quantity exceeds the available quantity
     */
    updateItem: async ( req, res ) =>{
        try{
            const userId = res.locals.user._id
            const { id, qty } = req.params
            let user = await userSchema.findByIdAndUpdate( userId, 
                {$set: { "cart.$[inner].quantity": qty }},
                { arrayFilters: [ {"inner.product" : new mongoose.Types.ObjectId( id ) }], new: true}
                ).lean()
            res.status( 200 ).json({status: 'successful', task: 'update Cart', payload: user.cart })
        }catch( error ){
            console.log('Error while pushing item to cart', error );
            res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})
        }
    
    }
}


export default cartController