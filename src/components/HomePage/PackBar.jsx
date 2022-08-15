import React from 'react';
import { SubTitle, Container_1_3 } from '../../styledComponents';
import PackList from './PackList';
import SearchBar from './SearchBar';
import { usePackStore } from './Store';

export default function PackBar() {
  const userPacks = usePackStore((state) => state.userPacksFiltered);
  const otherPacks = usePackStore((state) => state.allPacksFiltered);

    return (
      <Container_1_3>
        <SubTitle>Packs</SubTitle>
        <SearchBar />
        <PackList title="My Packs" packs={userPacks} />
        <PackList title="Other Packs" packs={otherPacks} />
      </Container_1_3>
    )
}
