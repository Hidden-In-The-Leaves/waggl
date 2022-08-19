/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import styled from 'styled-components';
import { SubTitle, Container_1_4 } from '../../../styledComponents';
import PackList from './PackList';
import SearchBar from './SearchBar';
import AddPack from './AddPack';
import { usePackStore } from '../Store';

export default function PackBar() {
  const userPacks = usePackStore((state) => state.joinedPacksFiltered);
  const otherPacks = usePackStore((state) => state.otherPacksFiltered);

  return (
    <Container_1_4>
      <TitleContainer>
        <SubTitle>Packs</SubTitle>
        <AddPack />
      </TitleContainer>
      <SearchBar />
      <PackList title="My Packs" packs={userPacks} />
      <PackList title="Other Packs" packs={otherPacks} />
    </Container_1_4>
  );
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
