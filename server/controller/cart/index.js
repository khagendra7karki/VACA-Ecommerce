import userSchema from "../../models/userSchema.js";

const cartController = {

    /**
     * adds item to the cart
     * 
     */
    addItem: async ( req, res ) =>{
        try{
            const userId = '6540aa8cb1e90976bbb33161'
            let user = await userSchema.findByIdAndUpdate(userId, {
                $push: { "cart.items": req.body}
            },);

            if( !user ) return res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})

            return res.status(200).json({status: 'successful', task: 'addItem', payload: user._doc.cart })
        }
        catch( error ){
            console.log('Error while pushing item to cart', error );
            res.status(500).json({ status:'unsuccessful', task: 'addItem', reason: 'Internal Error'})
        }

    },

    removeItem: async ( req, res ) =>{
        try{
            const userId = '6540aa8cb1e90976bbb33161'
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