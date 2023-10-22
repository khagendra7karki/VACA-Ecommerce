import axios from 'axios'

export const productsData = async(  )=>{
  console.log("About to send requrest to the server for products")
  const localHost = await axios.get( 'http://localhost:5000/products')
  return { data: [ ...(localHost.data.payload) ] };
}

