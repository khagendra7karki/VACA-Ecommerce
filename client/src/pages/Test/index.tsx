import CategoryButton from "../../components/Categories/CategoryButton";
export default function () {
    var date = new Date();

    // add a day
    date.setDate(date.getDate() + 2 );
    
    return <>
        <CategoryButton label = {'hello World'}/>
    </>
}
