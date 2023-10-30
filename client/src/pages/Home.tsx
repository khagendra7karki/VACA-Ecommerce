import React from 'react'

import { Divider } from '@mantine/core'
import { Footer } from '../components/Footer'
import Products from '../components/Products'
import Layout from '../Layout/Layout'
import Slider from '../components/Carousel'
export default function Home() {
  return (
  <Layout> 
    
     <Divider my="sm" />
     <Slider/>
   </Layout>
 
  )
}
