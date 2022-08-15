import React from 'react';
import styled from 'styled-components';

export default function PackItem({ pack }) {
  const packDescription = pack.description?.length > 30 ? pack.description.substring(0, 30) + '...' : pack.description;

  return (
    <FlexContainer>
      <RoundImg src={pack.url} />
      <FlexColumn>
        <MainText>{pack.name}</MainText>
        <SubText>{packDescription}</SubText>
      </FlexColumn>
    </FlexContainer>
  )
}

const FlexContainer = styled.div`
  display: flex;
  box-sizing:border-box;
  flex-direction: row;
  align-items: center;
  margin: 5% 0;
`;

const FlexColumn = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
`;

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