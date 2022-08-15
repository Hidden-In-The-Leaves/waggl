import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../styledComponents';

export default function PackItem({ pack }) {
  const packDescription = pack.description.length > 30 ? pack.description.substring(0, 30) + '...' : pack.description;

  return (
    <Flex flexDirection="row" alignItems="center" margin="5% 0">
      <RoundImg src={pack.photo} />
      <Flex flexDirection="column">
        <MainText>{pack.name}</MainText>
        <SubText>{packDescription}</SubText>
      </Flex>
    </Flex>
  )
}


const RoundImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 3%;
`;

const MainText = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const SubText = styled.div`
  font-size: 14px;
`;