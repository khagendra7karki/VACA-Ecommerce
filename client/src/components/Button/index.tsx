import { MouseEventHandler } from "react";

interface Iprops{
    onClick: MouseEventHandler<HTMLButtonElement>,
}
export default function Button ({onClick}: Iprops){
    

    return <>
        <button onClick = {onClick}>
        </button>
    </>
}