import styled from 'styled-components';
import React from 'react';

function BannerImage({ bannerUrl }) {
  return (
    <img src={bannerUrl} style={{ width: '100%', height: '30vh', objectFit: 'cover' }}/>
  );
}

export default BannerImage;