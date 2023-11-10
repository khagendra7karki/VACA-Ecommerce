import React, { SyntheticEvent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../state'

const UserProfile: React.FC = () =>{
    const { userInfo } = useSelector( ( state: State) => state.user )


    useEffect( () => {
        

    })

    const handleClick = (e: SyntheticEvent ) =>{
        console.log('Edit Profile Button has been clicked')

    }

    
    return <>
    <div>
        <h2>Full Name</h2>
        <h4> {userInfo.fullName}</h4>

        <h2> Email</h2>
        <h4> { userInfo.email }</h4>

        <h2> Phone Number </h2>
        <h4> { userInfo.phoneNumber  || 'No Phone number Provided' }</h4>

        <button onClick = { handleClick }>
            Edit Profile
        </button>
    </div>   
    </>    

}
export default UserProfile