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
        <Layout>
            <div style = {{display:"flex"}}>
                <UserNavBar/>
                <Outlet/>

            </div>
        </Layout>
    </>

}
export default User