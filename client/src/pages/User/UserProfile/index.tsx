import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../state'

const UserProfile: React.FC = () =>{
    const { userLogin } = useSelector( ( state: State) => state )
    useEffect( () => {


    })
    return <>
    
    </>    

}
export default UserProfile