import Product from "./models/Product.js";
import ScrappedProduct from "./models/ScrappedProduct.js";
import Database from "./utils/db.js";
import dotenv  from 'dotenv'
dotenv.config()


const db = new Database()

db.connectDB( process.env.MONGODB_URI )


const scrappedProducts = await ScrappedProduct.find({}).lean()

for ( const scrappedProduct of scrappedProducts ){
    const product = new Product( scrappedProduct )
    await product.save()
}


db.closeDB()
