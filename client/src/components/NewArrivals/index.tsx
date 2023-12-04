import './styles.scss'
const exampleNewArrivalObject = [
    {
        image: 'https://www.ufonepal.com/ufo/wp-content/uploads/2023/05/100186_ms2_DSC00227-Edit.jpg',
        title: 'Some random title',
        quote: 'Very Good and Elegant, it is.',
    },  
    {
        image: 'https://www.ufonepal.com/ufo/wp-content/uploads/2023/10/100721-104281_new_ms.jpg',
        title: 'Some random title',
        quote: 'Very Good and Elegant, it is.',
    },
    {
        image: 'https://www.ufonepal.com/ufo/wp-content/uploads/2023/10/100721-104281_new_ms.jpg',
        title: 'Some random title',
        quote: 'Very Good and Elegant, it is.',
    },
    {
        image: 'https://www.ufonepal.com/ufo/wp-content/uploads/2022/05/98818.jpg',
        title: 'Some random title',
        quote: 'Very Good and Elegant, it is.',
    }
]
interface Iprops { 
    image: string,
    title: string,
    quote: string
}
const NewArrivalItem = ({ newArrival } : {newArrival: Iprops}) =>{
    
    return <>
        <div className = 'arrival-item'>
            <img src={newArrival.image} alt="" />
            <div className="text">
                <h2>{newArrival.title}</h2>
                <p>{newArrival.quote}</p>
                <a href="#">Shop Now</a>

            </div>
        </div>
    </>

}
export default function NewArrivals(){
    return<>
        <div style = {{display: 'flex' , gap: '10px'}}>
            <NewArrivalItem newArrival = {exampleNewArrivalObject[0]} />
            <div>
                <NewArrivalItem newArrival={exampleNewArrivalObject[1]} />

                <div style = {{display: 'flex', gap: '10px'}}>
                    <NewArrivalItem newArrival = {exampleNewArrivalObject[2]} />
                    <NewArrivalItem newArrival = { exampleNewArrivalObject[3]} />

                </div>

            </div>
        </div>
    </>
}