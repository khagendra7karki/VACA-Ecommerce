import CountDownTimer from "../../components/CountDown";

export default function () {
    var date = new Date();

    // add a day
    date.setDate(date.getDate() + 2 );
    
    return <>
        <CountDownTimer targetDate = { date }/>
    </>
}
