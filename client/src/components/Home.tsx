import React from 'react'
import { HeaderSearch } from './Header'
import { Divider } from '@mantine/core'
import { Footer } from './Footer'
import Products from './Products'
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
