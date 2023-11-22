import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { bindActionCreators } from "redux"
import { State, actionCreators } from "../../state"
import { useEffect, useState } from "react"
import classes from './HeaderSearch.module.css';


export default function HeaderNav(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { logout } = bindActionCreators( actionCreators, dispatch )
    const handleLinkClick = ( url: string ) =>{
      navigate( url )
    }

    const { isLoggedIn } = useSelector( (state : State) => state.userLogin )
    
    const handleLogout = ( url: string ) =>{
      logout() 
    }
    const initialLinks = [
      { link: '/', label: 'Home', onClick: handleLinkClick },
      { link: '/Contact', label: 'Contact', onClick: handleLinkClick },
      { link: '/signup', label: 'signup', onClick: handleLinkClick },
      { link: '/cart', label: 'cart', onClick: handleLinkClick },
    ];
      const [ links, setLinks ] = useState( initialLinks )

    useEffect( () =>{
        setLinks( [ ...initialLinks, ( isLoggedIn ? { link: '/logout', label: 'logout', onClick : handleLogout }: { link: '/login', label: 'login', onClick: handleLinkClick} ) ])
    }, [ isLoggedIn ])

    return<>
    {
        links.map((link, index ) => (
    
            <button 
            key = { index }
            onClick = { (e) => link.onClick( link.link) }
            className = { classes.link }
            >
            { link.label }
            </button>

            
        ))
    }
    </>
}