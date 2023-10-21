import React from 'react'
import { HeaderSearch } from '../components/Header'
import { Divider } from '@mantine/core'
import { Footer } from '../components/Footer'
import Products from '../components/Products'
export default function Home() {
  return (
    <div >
    <HeaderSearch/>
    <Divider my="sm" />
    <Products/>
    <Footer/>
   </div>
  )
}
