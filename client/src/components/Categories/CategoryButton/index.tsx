import { ReactNode, SyntheticEvent } from "react"
import { IconSearch } from '@tabler/icons-react';
import './styles.scss'


interface Iprops{
    label: string,
    Icon?: ReactNode,
    navigateTo?: string,
}


export default function CategoryButton({ navigateTo, label , Icon = <IconSearch /> } : Iprops){
    const clickHandler = (e : SyntheticEvent) =>{
        console.log('Button has been Clicked')
    }
    return <>
        <a href = {`${navigateTo ? navigateTo : '#'}`} 
        className = 'category-button'>
            {Icon}
            {label}
        </a>
    </>
}