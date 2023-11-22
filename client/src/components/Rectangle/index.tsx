import { CSSProperties, ReactNode } from "react"

interface Iprops{
    color?: string,
    height?: string,
    width?: string,
    children?: ReactNode,
    sx?: CSSProperties
}

export default function Reactangle({color, height, width, sx, children}: Iprops){
    return <>
        <span style = {{ 
                        background: `${color? color: 'red'}`,
                        height: `${height ? height : '50px'}`,
                        width: `${width ? width : '30px'}`,
                        borderRadius: `${ height ? Number(height) / 10 + 'px' : '5px'}`,
                        ...sx,}}
        >
        {children}
        </span>
    </>
}