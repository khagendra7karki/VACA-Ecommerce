/**
 * TODO
 * 
 * Add frontend Authentication 
* 
 */
import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavBar from './UserNavBar'
import Layout from '../../Layout/Layout'


const User : React.FC = () =>{
    
    return <>
        <div style = {{display:"flex"}}>
            <UserNavBar/>
            <Outlet/>
        </div>
    </>

}
export default User