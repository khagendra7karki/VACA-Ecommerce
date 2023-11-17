import { MouseEventHandler } from "react";

interface Iprops{
    label: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
}

export default function Button ({label,onClick}: Iprops){
    
    

    return <>
        <button onClick = {onClick}>
            {label}
        </button>
    </>
}