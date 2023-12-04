import './styles.scss'
import { Link } from 'react-router-dom';
interface Iprops {
    category?: Array<String >,
}

const exampleCategory = [`Woman’s Fashion`, `Men’s Fashion`, `Active Wear`, `T-Shirt`, `Pants`, `Formal Wear`, `Outdoor & Adventure Clothing`, `Outer Wear`, `Plus Sized Clothing`]

export default function CategoryListText({category } : Iprops ){
    category = category ? category : exampleCategory;


    return <nav style = {{ display:'none',width: '400px'}} className = "category-list-nav">
                <ul className = 'category-list'>
                    { category.map((category, index) =>{
                        return <li  key = { index }
                                    className = 'category-list-item'>
                                <Link  className = 'category-list-item-a'to = '#'>
                                    {category}
                                </Link>
            
                            </li>
                    })}
                </ul>
            </nav>
    
    
}