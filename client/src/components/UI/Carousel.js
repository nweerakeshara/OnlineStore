import React from "react";
import { UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src:
      //   "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      "https://i.pinimg.com/originals/75/1d/2b/751d2b30f041d6a7ec336dbdef797311.jpg",
    altText: "Slide 1",
    key: "1",
  },
  {
    src:
      //   "https://images.pexels.com/photos/285171/pexels-photo-285171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://i.pinimg.com/originals/a0/04/7c/a0047c6fbe7355ce655176da3b4cba5e.jpg",
    altText: "Slide 2",

    key: "2",
  },
  {
    src:
      "https://i.pinimg.com/originals/7c/e0/b8/7ce0b8145c2a8150f4b971d18fc48d5c.jpg",
    altText: "Slide 3",
    key: "3",
  },
];

const Carousel = () => (
  <div style={{ margin: "20px" }}>
    <UncontrolledCarousel controls={false} items={items} />
  </div>
);

export default Carousel;
