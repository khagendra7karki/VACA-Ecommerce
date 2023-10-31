import userSchema from "../../models/userSchema.js";

const cartController = {

    /**
     * adds item to the cart
     * 
     */
    addItem: async ( req, res ) =>{
        try{
            const userId = res.locals.user._id;
            const { id , qty } = req.params; 
            let user = await userSchema.findByIdAndUpdate(userId, {
                $push: { "cart.items": { productId: id, quantity: qty } }
            },).lean();

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
            console.log('The product Id is ', req.body.productId )
            let user = await userSchema.findByIdAndUpdate(userId, {
                $pull: {"cart.items": {"productId": req.body.productId}},
            }        
            );

            if( !user ) return res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})

            return res.status(200).json({status: 'successful', task: 'addItem', payload: user._doc.cart })
        }
        catch( error ){
            console.log('Error while pushing item to cart', error );
            res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})
        }

    },

    updateItem: ( req, res ) =>{

    }
}


export default cartController