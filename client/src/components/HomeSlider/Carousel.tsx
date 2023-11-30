import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import classes from './Carousel.module.css'
const images: any = [
  "https://www.ufonepal.com/ufo/wp-content/uploads/2023/05/web-banner-2023-june.jpg",
  "https://cdn.create.vista.com/api/media/medium/241895634/stock-photo-top-view-green-shirt-shoes-jeans-wooden-background?token=",
  "https://cdn.create.vista.com/api/media/medium/241895634/stock-photo-top-view-green-shirt-shoes-jeans-wooden-background?token=",
  "https://cdn.stocksnap.io/img-thumbs/960w/woman-shopping_JN0TSD4UG5.jpg",
];

const Slider = () => {
 

  const slides = images.map((url: any, index : number) => (
    <Carousel.Slide key={ index }>
      <Image src={url}  />
    </Carousel.Slide>
  ));

  return (
    <Carousel 
    className= {classes.carousel}
      withIndicators 
      loop
<<<<<<< HEAD:client/src/components/Carousel.tsx
      height={470} 
=======
       height= '100%' 
       mb= {50}
>>>>>>> db1a9284140e74da918b54729f2bc93627c3b44e:client/src/components/HomeSlider/Carousel.tsx
    >
      {slides}
    </Carousel>
  );
};

export default Slider;
