import db from './utils/db.js'
import productSchema from './models/productSchema.js'
import dotenv from 'dotenv'
dotenv.config()


const product = productSchema

const URI = process.env.MONGODB_URI
const database = new db()
const connections = await database.connectDB( URI )

// await connections.connection.dropCollection('products')
const returnValue  = fetch( 'https://fakestoreapi.com/products?limit=100').then( res => res.json()).then( res => res)


const randomDiscountPercentage = [ 0.2, 0.3 , 0.45, 0.5, 0.1, 0.35, 0.25, 0.15] 
const randomQuantity = [ 0, 3, 4, 5, 0, 6, 7, 8, 0, 13]
const randomSize = [ 'xxl', 'xl', 'l', 'm', 's', 'xs']
const randomColor = [ 'red', 'orange', 'blue', 'yellow', 'green', 'pink']

function getRandomElements(arr, num) {
    let result = [];
    // console.log( Array.isArray(arr) )
    // console.log( arr.length )
    for (let i = 0; i < num; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        let element = arr.splice(randomIndex, 1)[0];
        result.push(element);
    }
    if( num == 1 ) return result[0]
    return result;
}




await returnValue.then( async (products) =>{
    for( let i = 0; i < products.length ;i++){

        const product = {
                            title: products[i].title,
                            price: products[i].price,
                            description: products[i].description,
                            // choose random discount percentage and deduct it from the original price 
                            oldPrice: (products[i].price - getRandomElements( [...randomDiscountPercentage], 1 ) * products[i].price).toFixed( 2 ),
                            size: getRandomElements( [...randomSize], 3 ),
                            color: getRandomElements( [...randomColor], 3 ),
                            image: [ products[i].image ],
                            category: products[i].category,
                            availableQuantity: getRandomElements( [...randomQuantity], 1)
                            
                        }
        console.log( product )
        const item = new productSchema( product )
        
        await item.save()

        
    }
})

//update a single field
// await product.updateMany( {}, { 
//     $set: { "review.reviews": [] }
// })


// const products = await productSchema.find( )





database.closeDB()
