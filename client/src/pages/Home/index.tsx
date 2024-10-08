import React from "react";
import Slider from "../../components/HomeSlider/Carousel";
import CardCarousel from "../../components/CardCarousel";
import { Group } from "@mantine/core";
import CategoryListText from "../../components/CategoryListText";
import "./styles.scss";
import Reactangle from "../../components/Rectangle";
import CountDownTimer from "../../components/CountDown";
import Categories from "../../components/Categories";

export default function Home() {
  var date = new Date();

  const category = [
    "T-Shirts",
    "sweater",
    "pants",
    "jackets",
    "UnderGarments",
    "Hoodies",
    "Shorts",
  ];

  // add a day
  date.setDate(date.getDate() + 2);
  return (
    <div>
      <Group style={{ flexDirection: "row", flexWrap: "nowrap" }}>
        {/* <CategoryListText /> */}
        <Slider />
      </Group>
      <Group>
        <Reactangle />
        <h5 className="sub-title">Today's</h5>
      </Group>
      <Group>
        <h1
          style={{ margin: "0", marginRight: "100px", alignSelf: "flex-end" }}
        >
          Flash Sales
        </h1>
        <CountDownTimer targetDate={date} />
      </Group>
      <CardCarousel />
      <div style={{height: "50px"}}></div>


      <Group>
        <Reactangle />
        <h5 className="sub-title">Categories</h5>
      </Group>
      <h1>Browse By Categories</h1>
      <Categories />
      <div style={{height: "70px"}}></div>
      <Group>
        <Reactangle />
        <h5 className="sub-title">This Month</h5>
      </Group>
      <h1>Best Selling Product</h1>

      <CardCarousel />
      <div style={{height: "70px"}}></div>

    </div>
  );
}
