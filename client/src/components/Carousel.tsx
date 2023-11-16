import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { v4 as uuidv4 } from 'uuid';

const images: any = [
  "https://cdn.create.vista.com/api/media/medium/532262682/stock-photo-denim-jacket-pants-shirt-hat-shoes-autumn-leaves-color-background?token=",
  "https://cdn.create.vista.com/api/media/medium/241895634/stock-photo-top-view-green-shirt-shoes-jeans-wooden-background?token=",
  "https://cdn.create.vista.com/api/media/medium/241895634/stock-photo-top-view-green-shirt-shoes-jeans-wooden-background?token=",
  "https://cdn.stocksnap.io/img-thumbs/960w/woman-shopping_JN0TSD4UG5.jpg",
];
const Slider = () => {
  const slides = images.map((url: any) => (
    <Carousel.Slide key={uuidv4()}>
      <Image src={url} />
    </Carousel.Slide>
  ));

  return (
    <Carousel 
      withIndicators 
      loop
      height={500} 
    >
      {slides}
    </Carousel>
  );
};

export default Slider;
