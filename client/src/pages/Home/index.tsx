import React from 'react'
import Slider from '../../components/Carousel'
import CardCarousel from '../../components/CardCarousel'
import { Card, Group, Space, Stack, Text } from '@mantine/core'
import CategoryListText from '../../components/CategoryListText'
export default function Home() {
  return (
    <Stack>
      <Group style={{display:'flex', flexDirection:'row', flexWrap: 'nowrap'}}>
        <CategoryListText />
        <Slider />
      </Group>
      <Space h="xl" />
      <Text fw={700} size="xl" ta="center" tt="uppercase">Aligned to center</Text>
      <Space h="md" />
      <CardCarousel />
      <Space h="xl" />
      <Text fw={700} size="xl" ta="center" tt="uppercase">Aligned to center</Text>
      <Space h="md" />
      <CardCarousel />
      <Space h="xl" />
    </Stack>
    
 
  )
}
