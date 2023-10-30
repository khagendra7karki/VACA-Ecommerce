import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

const images : any = ['https://images.app.goo.gl/wzGkLJWZfyh7vPB39', 'https://images.app.goo.gl/cV4TCpQLKtpTArzg6','https://images.app.goo.gl/CbtnX9z9enkfhZTf7', 'https://cdn.stocksnap.io/img-thumbs/960w/woman-shopping_JN0TSD4UG5.jpg'];
const Slider = () => {
    const slides = images.map((url : any) => (
        <Carousel.Slide key={url}>
          <Image src={url} />
        </Carousel.Slide>
      ));
    
      return <Carousel withIndicators>{slides}</Carousel>;
}

export default Slider