import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import './styles.scss'

interface Iprops{
    onClick: MouseEventHandler<HTMLButtonElement>,
    children?: ReactNode 
    sx ?: CSSProperties
}

export default function Button({onClick, children, sx }: Iprops){
    

    return <>
        <button className = 'custom-button'onClick = {onClick} style = { sx }>
            {children}
        </button>
    </>
}