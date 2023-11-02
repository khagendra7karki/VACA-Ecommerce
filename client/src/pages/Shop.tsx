import React from 'react'
import Layout from '../Layout/Layout'
import { Divider } from '@mantine/core'
import Products from '../components/Products'
export default function Shop() {
  return (
    <Layout> 
    <div >
      <Divider my="sm" />
      <Products/>
    </div>
   </Layout>
  )
}
