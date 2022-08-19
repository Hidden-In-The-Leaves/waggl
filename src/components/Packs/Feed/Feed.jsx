/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import { Container_2_3, Title } from '../../../styledComponents';
import FeedList from './FeedList';

export default function Feed({ packData }) {
  return (
    <Container_2_3>
      <BorderedTitle>
        {packData.packName}
      </BorderedTitle>
      <FeedList />
    </Container_2_3>
  );
}

const BorderedTitle = styled(Title)`
  border-bottom: 1px solid #D9D9D9;
  margin: 5px 0;
  padding: 20px 0;
`;
