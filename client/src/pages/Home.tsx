import React from 'react'

import { Divider } from '@mantine/core'
import { Footer } from '../components/Footer'
import Products from '../components/Products'
import Layout from '../Layout/Layout'
export default function Home() {
  return (
  <Layout> 
    <div >
      <Divider my="sm" />
      <Products/>
    </div>
   </Layout>
 
  )
}
