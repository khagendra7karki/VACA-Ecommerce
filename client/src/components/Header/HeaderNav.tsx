import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { bindActionCreators } from "redux"
import { State, actionCreators } from "../../state"
import './styles.scss'


export default function HeaderNav({drawerOpened } : { drawerOpened: boolean}){
    const dispatch = useDispatch()

    const { logout } = bindActionCreators( actionCreators, dispatch )

    const { isLoggedIn } = useSelector( (state : State) => state.userLogin )
    

    return<>
      <nav>
        <ul className = {`${drawerOpened ? 'mobile-nav': 'link-wraper'}`}>
          <li>
            <Link to = '/' className = {`${drawerOpened ? 'mobile-nav-item' : 'link'}`} > Home</Link>
          </li>

          <li>
            <Link to = '/contact' className = {`${drawerOpened ? 'mobile-nav-item' : 'link'}`} >Contact</Link>
          </li>
          <li>
            <Link to = '/cart' className = {`${drawerOpened ? 'mobile-nav-item' : 'link'}`}>Cart</Link>
          </li>
          <li>
            <Link to = '/wishlist' className = {`${drawerOpened ? 'mobile-nav-item' : 'link'}`} >Wish List</Link>
          </li>

          <li style = {{display: `${isLoggedIn ? 'block': 'none'}`}}>
            <button className = {`${drawerOpened ? 'mobile-nav-item' : 'link'}`} onClick = {(e) => logout() } >Logout</button>
          </li>
          <li style = {{display: `${isLoggedIn ? 'none': 'block'}`}}>
            <Link to = '/login' className = {`${drawerOpened ? 'mobile-nav-item' : 'link'}`}>Login</Link>
          </li>

          <li style = {{display: `${isLoggedIn ? 'none': 'block'}`}}>
            <Link to = '/signUp' className = {`${drawerOpened ? 'mobile-nav-item' : 'link'}`} >Sign Up</Link>
          </li>
        </ul>
        
      </nav>
    </>
}