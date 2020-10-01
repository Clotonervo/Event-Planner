import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Img = styled.img`
  outline: none;
  user-drag: none;
  user-select: none;
`;

const LogoPaths = {
  'mark-only': 'logo_markonly.svg',
  'mark-with-text': 'logo_marktext.svg',
};

const Logo = ({ type }) => {
  const logoPath = LogoPaths[type];

  return (
    <Wrapper>
      <Img src={logoPath} alt='Event Planner Logo' />
    </Wrapper>
  );
}

export default Logo;
