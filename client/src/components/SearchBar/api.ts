import axios from "axios";
import { store } from "../../state";

export default function quickSearch(keyword: string){
    const currentProspect = store.getState().products.products.filter( (product : any) => product.title.match(keyword) )
    return currentProspect.map( (product : any) => {return { value: product._id, label : product.title}})
    // try{
    //     const { data } = await axios.get(
    //             `${process.env.REACT_APP_API_URL}/product/getProducts/search?keyword=${keyword}`
    //         );
    //     return data
        
    // }catch(error){
    //     console.log( error )
    //     return
    // }
}