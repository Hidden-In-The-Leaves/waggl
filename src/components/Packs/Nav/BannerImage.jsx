import styled from 'styled-components';
import React from 'react';

function BannerImage({ bannerUrl }) {
  return (
    <img height="auto" min-width="100%" max-width="100%" src={bannerUrl} />
  );
}

export default BannerImage;
