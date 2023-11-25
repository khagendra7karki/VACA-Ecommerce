import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { bindActionCreators } from "redux"
import { State, actionCreators } from "../../state"
import { useEffect, useState } from "react"
import './styles.scss'


export default function HeaderNav(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { logout } = bindActionCreators( actionCreators, dispatch )
    const handleLinkClick = ( url: string, label: string ) =>{
      setSelected( label )
      navigate( url )
    }

    const { isLoggedIn } = useSelector( (state : State) => state.userLogin )
    
    const handleLogout = ( url: string, label : string ) =>{
      setSelected( label )
      logout() 
    }
    const initialLinks = [
      { link: '/', label: 'Home', onClick: handleLinkClick },
      { link: '/contact', label: 'Contact', onClick: handleLinkClick },
      { link: '/cart', label: 'Cart', onClick: handleLinkClick },
      { link : '/wishlist', label: 'Wish List', onClick: handleLinkClick}
    ];
    const [ links, setLinks ] = useState( initialLinks )
    const [ selected, setSelected ] = useState<string>('Home');

    useEffect( () =>{
        setLinks( [ ...initialLinks, ...( isLoggedIn ? [{ link: '/logout', label: 'Logout', onClick : handleLogout }]: [{ link: '/signup', label: 'Sign Up', onClick: handleLinkClick },{ link: '/login', label: 'Login', onClick: handleLinkClick}] ) ])
    }, [ isLoggedIn ])

    return<>
    {
        links.map((link, index ) => (
    
            <button 
            key = { index }
            onClick = { (e) => link.onClick( link.link, link.label) }
            className = { `link ${selected == link.label ? 'selected' : '' }`}
            >
            { link.label }
            </button>

            
        ))
    }
    </>
}