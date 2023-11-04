import React from 'react'


import { Footer } from '../components/Footer'
import Products from '../components/Products'
import Layout from '../Layout/Layout'
import Slider from '../components/Carousel'
import Cardslide1 from '../components/CardCarousel/CardCarousel1'
import Cardslide2 from '../components/CardCarousel/CardCarousel2'
import { Space, Stack, Text } from '@mantine/core'
export default function Home() {
  return (
  <Layout> 
    <Stack
      //h={300}
      bg="var(--mantine-color-blue-light)"
    
    > 
   <Slider />
   <Space h="xl" />
   <Text fw={700} size="xl" ta="center" tt="uppercase">Aligned to center</Text>
   <Space h="md" />
   <Cardslide1/>
   <Space h="xl" />
   <Text fw={700} size="xl" ta="center" tt="uppercase">Aligned to center</Text>
   <Space h="md" />
   <Cardslide2/>
   <Space h="xl" />
    </Stack>
    
   </Layout>
 
  )
}
