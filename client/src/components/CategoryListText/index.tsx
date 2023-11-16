import react from 'react';
import './styles.css'
import { Link } from 'react-router-dom';
interface Iprops {
    category?: Array<String >,
}

const exampleCategory = [`Woman’s Fashion`, `Men’s Fashion`, `Active Wear`, `T-Shirt`, `Pants`, `Formal Wear`, `Outdoor & Adventure Clothing`, `Outer Wear`, `Plus Sized Clothing`]

export default function CategoryListText({category } : Iprops ){
    category = category ? category : exampleCategory;


    return<>
            <nav style = {{ width: '400px'}}>
                <ul className = 'category-list'>
                    { category.map(category =>{
                        return <>
                            <li className = 'category-list-item'>
                                <Link  className = 'category-list-item-a'to = '#'>
                                    {category}
                                </Link>
            
                            </li>
                        </>
                    })}

                </ul>
            </nav>
    </>
    
}