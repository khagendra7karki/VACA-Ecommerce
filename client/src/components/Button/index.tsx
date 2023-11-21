import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import './styles.scss'

interface Iprops{
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children?: ReactNode 
    sx ?: CSSProperties
    type?: 'submit' | 'button' | 'reset'
    fullWidth?: boolean
}

export default function Button({onClick, children, fullWidth, sx, type }: Iprops){
    

    return <>
        <button
            type = { type } 
            className = {`custom-button ${ fullWidth ? 'full-width' : '' }`} 
            onClick = {onClick} 
            style = { sx }
        >
            {children}
        </button>
    </>
}