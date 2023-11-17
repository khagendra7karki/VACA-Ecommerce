import React from 'react'
import Slider from '../../components/Carousel'
import CardCarousel from '../../components/CardCarousel'
import { Group, Stack } from '@mantine/core'
import CategoryListText from '../../components/CategoryListText'
import './styles.scss'
import Reactangle from '../../components/Rectangle'
import newArrivals from '../../assets/img/newArrivals.png';
import categories from '../../assets/img/categories.png'
import CountDownTimer from '../../components/CountDown'
export default function Home() {
      var date = new Date();

    // add a day
    date.setDate(date.getDate() + 2 );
  return (
    <Stack >
        <Group style={{flexDirection:'row', flexWrap: 'nowrap'}}>
            <CategoryListText />
        <Slider />
        </Group>
        <Group >
            <Reactangle />
            <h5>Today's</h5>
        </Group>
        <Group>
          <h1>
              Flash Sales
          </h1>
          <CountDownTimer targetDate = {date} />

        </Group>
        <CardCarousel/>

        <Group >
            <Reactangle />
            <h5>Categories</h5>
        </Group>
        <h1>
            Browse By Categories
        </h1>
        <img src = {categories} />
        <Group >
            <Reactangle />
            <h5>This Month</h5>
        </Group>
        <h1>
            Best Selling Product
        </h1>

        <CardCarousel />

        <Group >
            <Reactangle />
            <h5>Featured</h5>
        </Group>
        <h1>
            New Arrival
        </h1>
        <img src = {newArrivals } />
    </Stack>
  )
}