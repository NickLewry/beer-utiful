import React from "react";
import styled from "styled-components";

const BeerButton = ({ onclick, disableButton }) => {
  return (
    <BeerButtonContainer>
      <RequestBeerButton onClick={onclick} disableButton={disableButton}>
        More Beers
      </RequestBeerButton>
    </BeerButtonContainer>
  );
};

const BeerButtonContainer = styled.div`
  border: 1px solid black;
`;

const RequestBeerButton = styled.button.attrs(({ disableButton }) => ({
  disabled: disableButton
}))``;

export default BeerButton;
