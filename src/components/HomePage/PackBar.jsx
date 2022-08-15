import React from 'react';
import { SubTitle, Container_1_3 } from '../../styledComponents';
import PackList from './PackList';

export default function PackBar({ packs }) {
    return (
      <Container_1_3>
        <SubTitle>Packs</SubTitle>
        {/* <SearchBar /> */}
        <div>
          <PackList title="My Packs" packs={packs} />
        </div>
        <div>
          <PackList title="Other Packs" packs={packs} />
        </div>
      </Container_1_3>
    )
}