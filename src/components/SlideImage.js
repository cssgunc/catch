import styled from "styled-components";

export const SlideImage = styled.img`
  width: 350px;
  height: 300px;
  object-fit: cover;
`;

export const StyledSlider = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled.button`
  background-color: #fff;
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.25));
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
