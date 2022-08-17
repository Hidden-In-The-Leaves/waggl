/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import { Container_1_2, Title } from '../../../styledComponents';
import FeedList from './FeedList';

export default function Feed() {
  return (
    <Container_1_2>
      <BorderedTitle>
        Home
      </BorderedTitle>
      <FeedList />
    </Container_1_2>
  );
}

const BorderedTitle = styled(Title)`
  border-bottom: 1px solid #D9D9D9;
  margin: 5px 0;
  padding: 20px 0;
`;
