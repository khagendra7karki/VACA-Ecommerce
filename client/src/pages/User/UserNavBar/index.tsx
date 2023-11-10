import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../state'
import { Link } from 'react-router-dom'

const UserNavBar = () => {
    const { userInfo } = useSelector( ( state: State ) =>   state.user )
  
  return <>
    <nav>
        <ul>
            <li> Manage My Account
                <ul>
                    <li>
                        <Link to = {`myProfile`}>
                            My Profile
                        </Link>

                    </li>
                    <li>
                        <Link to = {`/addressBook`}>
                            Address Book
                        </Link>
                    </li>
                    <li>
                        <Link to = {``}>
                            My payment Option
                        </Link>
                    </li>
                </ul>
            </li>

            <li>My Orders
                <ul>
                    <li>
                        <Link to = {`myReturn`}>
                            My Returns
                        </Link>
                    </li>
                    <li>
                        <Link to = {`myCancellation`}>
                            My Cancellation
                        </Link>
                    </li>        

                </ul>
            </li>
            <li>
                <Link to = {`myWishList`}>
                    My Wishlist
                </Link>
            </li>
            <li>
                <Link to = {`myCart`}>
                    My Cart
                </Link>
            </li>
        </ul>
    </nav>
  </>
}
export default UserNavBar