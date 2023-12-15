import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { bindActionCreators } from "redux"
import { State, actionCreators } from "../../state"
import './styles.scss'


export default function HeaderNav({drawerOpened, toggleDrawer } : { drawerOpened: boolean, toggleDrawer: () => void }){
    const dispatch = useDispatch()

    const { logout } = bindActionCreators( actionCreators, dispatch )

    const { isLoggedIn } = useSelector( (state : State) => state.userLogin )
    

    return<>
      <nav style = {{ marginLeft: 'auto', display : `${drawerOpened ? 'block': 'none'}`}}>
        <ul className = {`link-wraper`}>
          <li>
            <Link to = '/' onClick = {toggleDrawer} className = {`link`} > Home</Link>
          </li>

          <li>
            <Link to = '/contact' onClick = {toggleDrawer} className = {`link`} >Contact</Link>
          </li>

          <li>
            <Link to = '/cart' onClick = {toggleDrawer} className = {`link`}>Cart</Link>
          </li>
          
          <li>
            <Link to = '/wishlist' onClick = {toggleDrawer} className = {`link`} >Wish List</Link>
          </li>

          <li style = {{display: `${isLoggedIn ? 'block': 'none'}`}}>
            <button className = {`link`} onClick = {(e) => {toggleDrawer();logout()} } >Logout</button>
          </li>

          <li style = {{display: `${isLoggedIn ? 'none': 'block'}`}}>
            <Link to = '/login' onClick = {toggleDrawer} className = {`link`}>Login</Link>
          </li>

          <li style = {{display: `${isLoggedIn ? 'none': 'block'}`}}>
            <Link to = '/signUp' onClick = {toggleDrawer} className = {`link`} >Sign Up</Link>
          </li>
        </ul>
        
      </nav>
    </>
}