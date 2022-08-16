/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import { Container_1_3, Title } from '../../../styledComponents';
import FeedList from './FeedList';

export default function Feed() {
  return (
    <Container_1_3>
      <Title>
        Home
      </Title>
      <FeedList />
    </Container_1_3>
  );
}

