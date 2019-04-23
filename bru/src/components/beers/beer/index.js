import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazy-load";

const Beer = props => {
  const { id, name, tagline, image } = props;
  return (
    <BeerContainer key={id}>
      <BeerContent>
        <h4>{name}</h4>
        <p>{tagline}</p>
        <LazyLoad
          width={100}
          height={100}
          debounce={false}
          offsetVertical={500}
        >
          <BeerImage src={image} />
        </LazyLoad>
      </BeerContent>
    </BeerContainer>
  );
};

const BeerContainer = styled.div`
  display: inline-block;
  border: 1px solid black;
  flex-grow: 1;
  justify-content: space-around;
  width: calc(100% * (1 / 5) - 10px - 1px);
`;

const BeerContent = styled.div`
  padding: 20px 20px 0;
`;

const BeerImage = styled.img`
  height: 60px;
  width: 20px;
`;

export default Beer;
