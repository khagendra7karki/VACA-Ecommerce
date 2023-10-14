/**
 * 
 * admin routes
 * 
 */

import express from 'express'   
import adminAuthentication from './adminAuthenticate.js'


const routes = express.Router()


routes.post( 'admin/login', adminAuthentication.login )

routes.post('admin/logout', adminAuthentication.logout )

routes.post('admin/*', adminAuthentication.authenticateToken,( res, req ) =>{
    res.json({message:"hello world"})
} )


export default routes
