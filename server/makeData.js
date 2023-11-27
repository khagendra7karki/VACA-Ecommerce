import puppeteer from 'puppeteer'
import ScrappedProduct from './models/ScrappedProduct.js';
import Database from './utils/db.js'
import dotenv from 'dotenv'

dotenv.config()

const db = new Database()
db.connectDB(process.env.MONGODB_URI)

class ScrapeData{
    static #borwser;
    static #page;

    constructor(){
        console.log('Scrape Data class has been initialized')
    }

    
    async init(headless = false, devtools = false){
        this.browser = await puppeteer.launch({headless: headless, devtools: devtools})
        this.page = await this.browser.newPage()
    }

    async close(){
        await this.browser.close()
        console.log('Scrape Data Class has been closed')
    }

    async generateProductLinks( link = 'https://www.ufonepal.com/product-category/men/men-new-arrivals/', selector = 'ul.products > li'  ){
        try{
            await this.page.goto( link)
            await this.page.waitForSelector(selector)
            return await this.page.$$eval(selector, lis =>{
                return lis.map( li => li.querySelector('a').href )
            })
            
        }catch( error ){
            console.log('At generateProductLnks', error )

        }
    }

    async goToLinksAndScrape( links = [], selector = 'div.summary' ){
        try {
            const requiredData = []
            for ( const link of links ){
                await this.page.goto( link )
                await this.page.waitForSelector('div.images')
                await this.page.waitForSelector(selector)
                // const images = []
                const productInfo = await this.page.$eval( 'div.product' , element =>{
                    images = [element.querySelector('img.attachment-shop_single')?.src]
                    imageElements = element.querySelectorAll('img.attachment-shop_thumbnail')
                    if ( imageElements ){
                        imageElements.forEach( elem => {
                            images.push(elem.src)
                        } )                        
                    }

                    optionsElement = element.querySelectorAll('#pa_color > option.attached.enabled')
                    options = []
                    if ( options )
                        optionsElement.forEach( option => options.push(option.value))

                    price = element.querySelector('div:nth-child(2) > meta:nth-child(2)')?.content
                    title = element.querySelector( 'div.summary > h2')?.textContent
                    
                    return { price, title, images, options }

                })

                

                requiredData.push( productInfo)
            }
            return requiredData
            
        } catch (error) {
            console.log('At goToLinksAndScrape', error )
        }
    }

}

async function makeData( datas ){
    const randomDiscountPercentage = [ 0, 0.3 , 0.45, 0, 0.1, 0.35, 0.25, 0] 
    const randomQuantity = [ 0, 3, 4, 5, 0, 6, 7, 8, 0, 13]
    const randomSize = [ 'xxl', 'xl', 'l', 'm', 's', 'xs']
    const randomColor = [ 'red', 'orange', 'blue', 'yellow', 'green', 'pink', 'black']
    // const randomDescription = [
    //     'A charming knee-length dress that flatters any figure with its classic A-line silhouette. This dress features a romantic sweetheart neckline and is adorned with an intricate floral pattern. The fabric is lightweight and flows beautifully, making it perfect for a sunny day out.',
    //     'This is a statement blouse made from luxurious silk that feels soft against the skin. It comes in a vibrant turquoise color that stands out. The design includes bell sleeves, adding a retro touch to the modern loose fit. It\'s a versatile piece that can be paired with jeans for a casual look or with a skirt for a more formal occasion.',
    //     'A timeless high-waisted midi skirt that adds a touch of elegance to any outfit. The skirt features a pleated design and comes in a neutral beige color that pairs well with almost anything. Made from a soft and comfortable fabric, it\'s perfect for both work and play.',
    //     'This is a trendy cropped leather jacket in a versatile black color. It\'s made from high-quality leather and features silver hardware and zippers for added style. The jacket is designed to sit just above the waist, giving it a modern and edgy look. Pair it with jeans for a rocker chic vibe or over a dress for a touch of toughness.',
    //     'A sophisticated wide-legged jumpsuit in a classic navy blue color. It\'s designed with a flattering tie waist detail and delicate spaghetti straps, creating a balance between comfort and style. Whether you\'re heading to the office or going out for dinner, this jumpsuit is a one-and-done outfit that never fails to impress.',
    //     'Elevate your footwear game with this pair of strappy high-heeled sandals in a dazzling metallic gold color. These shoes are perfect for formal events or parties where you want to make a statement. With an adjustable buckle for a secure fit and a cushioned insole for comfort, these heels combine style and practicality.'
    // ]
    // const randomCategory = ['Dress', 'Blouse', 'Skirt', 'Jacket', 'Jumpsuit', 'Shoes']
    const randomDescription = [
        'Blue Denim Jacket with metal buttons and two chest pockets',
        'Black Leather Jacket with a soft inner lining and stylish zip details',
        'Gray Sweatshirt made from soft cotton with a round neck and long sleeves',
        'White T-Shirt made from breathable material, perfect for everyday wear',
        'Black Jeans with a slim fit design and five pockets',
        'Blue Denim Jeans with a straight cut and a lightly washed finish',
        'Brown Leather Belt with a polished buckle, perfect for formal wear',
        'Black Leather Shoes with a comfortable insole and lace-up design'
    ]
    const randomCategory = ['Jackets', 'Jackets', 'Sweatshirts', 'T-Shirts', 'Jeans', 'Jeans', 'Accessories', 'Shoes']


    function getRandomElements(arr, num) {
        let result = [];
        for (let i = 0; i < num; i++) {
            let randomIndex = Math.floor(Math.random() * arr.length);
            let element = arr.splice(randomIndex, 1)[0];
            result.push(element);
        }
        if( num == 1 ) return result[0]
        return result;
    }

    for ( const data of datas ){
        const product = {
                    title: data.title,
                    oldPrice: data.price,
                    description: getRandomElements( [ ...randomDescription], 1),
                    // choose random discount percentage and deduct it from the original price 
                    price: (data.price - getRandomElements( [...randomDiscountPercentage], 1 ) * data.price).toFixed( 2 ),
                    size: getRandomElements( [...randomSize], 3 ),
                    options : data.options.length != 0 ? data.options : getRandomElements([...randomColor], data.images.length ) ,
                    images:  data.images ,
                    category: getRandomElements( [...randomCategory ], 1),
                    availableQuantity: getRandomElements( [...randomQuantity], 1)
                    
                }

        const newProduct = new ScrappedProduct(product)
        await newProduct.save();

    }

}

const dataScrapper =new ScrapeData();
await dataScrapper.init(true, false)
// await dataScrapper.init( false, true )
const links = await dataScrapper.generateProductLinks()
// console.log( links )
const requiredData = await dataScrapper.goToLinksAndScrape( links )
// console.log( requiredData )
await makeData(requiredData);
await dataScrapper.close()




db.closeDB()


