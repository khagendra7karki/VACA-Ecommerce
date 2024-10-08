import mongoose from 'mongoose';
import User from "../../models/User.js";
import Product from "../../models/Product.js";

const wishListController= {

    /** gets wish list items from user model */
    getItem: async ( req, res ) =>{
        try{
            const userId = res.locals.user._id;
            let result = await User.findById(userId, {wishList: 1, _id: 0})
            .populate( 'wishList.product', 'availableQuantity')
            .lean()
            
            return res.status( 200 ).json({ status: 'successful', task: 'getItem', payload: result.wishList })

        }catch( error ){
            console.log('Error while getting getItem', error );
            res.status(500).json({ status:'unsuccessful', task: 'getItem', reason: 'Internal Error'})

        }
    },


    /** adds item to the wish list */
    addItem: async ( req, res ) =>{
        try{
            const userId = res.locals.user._id;

            const { id } = req.params;
            //find the product from the database
            let product = await Product.findById( id ).lean()
            let productObject = { product: product._id, price: product.price,
                                 title: product.title, 
                                 image: product.images[0] }
                                 
            let user = await User.findByIdAndUpdate(userId, {
                $push: { "wishList": productObject }
            }, 
            { new: true })
            .populate('wishList.product', 'availableQuantity')
            .lean();

            if( !user ) return res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})

            return res.status(200).json({status: 'successful', task: 'addItem', payload: user.wishList.at(-1) })

        }
        catch( error ){
            console.log('Error while pushing item to cart', error );
            res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})
        }

    },

    /** Removes item from the cart */
    removeItem: async ( req, res ) =>{
        try{
            const userId = res.locals.user._id;
            const { id } = req.params;
            let user = await User.findByIdAndUpdate(userId,{
                $pull: {"wishList": {"product": id}},
            
            }, { new: true }).lean()

            if( !user ) return res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})

            return res.status(200).json({status: 'successful', task: 'removeItem', payload: user.wishList })
        }
        catch( error ){
            console.log('Error while pushing item to cart', error );
            res.status(500).json({ status:'unsuccessful', task: 'removeItem', reason: 'Internal Error'})
        }

    },

}


export default wishListController