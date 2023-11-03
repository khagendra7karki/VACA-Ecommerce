/**
 * TODO
 * 
 * Every function is doing the similar 
 * task. So extract those logic into a function
 * to decompose the code
 * 
 */
import mongoose from 'mongoose'
import userSchema from "../../models/userSchema.js";
import productSchema from '../../models/productSchema.js'
const cartController = {

    /**
     * adds item to the cart
     * 
     */
    addItem: async ( req, res ) =>{
        try{
            const userId = res.locals.user._id;

            const { id , qty } = req.params;
            console.log( id, qty  )
            console.log( userId )
            //find the product from the database
            let product = await productSchema.findById( id ).lean()

            console.log( product )
            let user = await userSchema.findByIdAndUpdate(userId, {
                $push: { "cart.items": { productId: product._id, ...product , quantity: qty } }
            }, { new: true }).lean();

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
     * Removes item from the cart
     * 
     */
    removeItem: async ( req, res ) =>{
        try{
            const userId = res.locals.user._id;
            const { id } = req.params   // product Id
            console.log( 'The product Id is', id )
            let user = await userSchema.findByIdAndUpdate(userId, {
                $pull: {"cart.items": {"productId": id }},
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
                {$set: { "cart.items.$[inner].quantity": qty }},
                { arrayFilters: [ {"inner.productId" : new mongoose.Types.ObjectId( id ) }], new: true}
                ).lean()
            res.status( 200 ).json({status: 'successful', task: 'update Cart', payload: user.cart })
        }catch( error ){
            console.log('Error while pushing item to cart', error );
            res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})
        }
    
    }
}


export default cartController