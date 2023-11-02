import db from './utils/db.js'
import productSchema from './models/productSchema.js'
import dotenv from 'dotenv'
dotenv.config()

const URI = process.env.MONGODB_URI
const database = new db()
const connections = await database.connectDB( URI )

// await connections.connection.dropCollection('products')
const returnValue  = fetch( 'https://fakestoreapi.com/products?limit=100').then( res => res.json()).then( res => res)


const randomDiscountPercentage = [ 0.2, 0.3 , 0.45, 0.5, 0.1, 0.35, 0.25, 0.15] 
const randomQuantity = [ 0, 3, 4, 5, 0, 6, 7, 8, 0, 13]


await returnValue.then( async (products) =>{
    console.log( products.length )
    for( let i = 0; i < products.length ;i++){

        const product = {
                            title: products[i].title,
                            price: products[i].price,
                            description: products[i].description,
                            // choose random discount percentage and dedcut it from the original price 
                            oldPrice: (products[i].price - randomDiscountPercentage[Math.floor( randomDiscountPercentage.length * Math.random() )] * products[i].price).toFixed( 2 ),
                            
                            image: [ products[i].image ],
                            category: products[i].category,
                            availableQuantity: randomQuantity[ Math.floor( randomQuantity.length * Math.random() )]

                        }
        console.log( product )
        const item = new productSchema( product )
        
        await item.save()

        
    }
})

// const products = await productSchema.find( )





database.closeDB()
