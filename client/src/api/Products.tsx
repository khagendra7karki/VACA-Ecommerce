import axios from "axios";

export const productsData = async(  )=>{
  const localHost = await axios.get( 'http://localhost:5000/products')
  return { data: [ ...(localHost.data.payload) ] };
}

