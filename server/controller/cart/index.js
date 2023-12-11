/**
 * TODO
 * 
 * Every function is doing the similar 
 * task. So extract those logic into a function
 * to decompose the code
 * 
 */
import mongoose from 'mongoose'
import User from "../../models/User.js";
import Product from '../../models/Product.js'
const cartController = {

    getItem: async ( req, res ) =>{
        try{
            const userId = res.locals.user._id;
            let result = await User.findById(userId, {cart: 1, _id: 0}).populate( 'cart.product', 'availableQuantity').lean()
            return res.status( 200 ).json({ status: 'successful', task: 'getItem', payload: result.cart })

        }catch( error ){
            console.log('Error while getting getItem', error );
            res.status(500).json({ status:'unsuccessful', task: 'getItem', reason: 'Internal Error'})

        }
    },

    /**
     * adds item to the cart
     * 
     */
    addItem: async ( req, res ) =>{
        try{
            const userId = res.locals.user._id;

            const { id , qty } = req.params;
            //find the product from the database
            let product = await Product.findById( id ).lean()
            
            let cartObject = { product: product._id, price: product.price, title: product.title, image: product.images[0], quantity: qty }
            let user = await User.findByIdAndUpdate(userId, {
                $push: { "cart": cartObject }
            }, { new: true }).populate('cart.product', 'availableQuantity').lean();

            if( !user ) return res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})

            return res.status(200).json({status: 'successful', task: 'addItem', payload: user.cart.at(-1) })
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
            let user = await User.findByIdAndUpdate(userId, {
                $pull: {"cart": {"product": id }},
            },{ new: true }).populate('cart.product', 'availableQuantity').lean();

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

            let user = await User.findByIdAndUpdate( userId, 
                {$set: { "cart.$[inner].quantity": qty }},
                { arrayFilters: [ {"inner.product" : new mongoose.Types.ObjectId( id ) }], new: true},

                ).populate('cart.product', 'availableQuantity').lean()
            
            res.status( 200 ).json({status: 'successful', task: 'updateItem', payload: user.cart })
        
        }catch( error ){
            
            console.log('Error while pushing item to cart', error );
            res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})
            
        }
    
    },

    /**Clears cart items */
    clearCartItems: async ( req, res) =>{
        try{
            const userId = res.locals.user._id
            await User.findByIdAndUpdate( userId, 
                {$set: { "cart": [] }},
                {new: true}
            ).lean()

            res.status(200).json({status: 'successful', task: 'clearCartItems'})

            
        }catch( error ){
            
            console.log('Error while clearing cart Items', error );
            res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})
            
        }
    }
}


export default cartController