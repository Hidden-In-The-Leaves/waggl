import styled from 'styled-components';
import React from 'react';

function BannerImage({ bannerUrl }) {
  return (
    <Img src={bannerUrl} />
  );
}

export default BannerImage;

const Img = styled.img`
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
`;
