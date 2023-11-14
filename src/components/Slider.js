import React, { useState } from "react";
import { SlideImage, StyledSlider, StyledButton } from "./SlideImage";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <StyledSlider>
      <StyledButton onClick={prevSlide}><FaChevronLeft className="leftArrow" /></StyledButton>      
      {slides.map((slide, index) => {
        return (
          <div key={index}>
            {index === current && <SlideImage src={slide.image} alt="" />}
          </div>
        );
      })}
      <StyledButton onClick={nextSlide}><FaChevronRight className="rightArrow" /></StyledButton>
      
    </StyledSlider>
  );
};

export default Slider;
