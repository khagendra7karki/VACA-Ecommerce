import CategoryButton from "./CategoryButton"

const category = [ 'T-Shirts','sweater', 'pants', 'jackets', 'UnderGarments', 'Hoodies', 'Shorts']

export default function Categories({categories = category}) {
    return <>
        <div style = {{display: 'flex', justifyContent: 'space-around'}}>
                { categories.map( ( category, index) =>{
                    return <CategoryButton label = {category } key = { index } />
                })}
        </div>
    </>
}