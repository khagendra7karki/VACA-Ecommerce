import React, { useEffect } from 'react'
import 
    import { useSelector } from 'react-redux'
import { State } from '../../../state'

const UserProfile: React.FC = () =>{
    const { userInfo } = useSelector( ( state: State) = > state.userInfo)
    useEffect( () => {


    })
    return <>
    
    </>

}
export default UserProfile