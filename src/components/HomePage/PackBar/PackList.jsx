import React from 'react';
import styled from 'styled-components';
import PackItem from './PackItem';
import { SectionTitle } from '../../../styledComponents';
import { usePackStore } from './../Store';

export default function PackList({ title, packs }) {
  return (
    <Div>
      <SectionTitle>
        {title}
      </SectionTitle>
      <Scroller>
        {packs.map((pack) => <PackItem key={pack.id} pack={pack} />)}
      </Scroller>
    </Div>
  )
}

const Div = styled.div`
  margin: 30px 0;
`;

const Scroller = styled.div`
  overflow-y: auto;
  max-height: 28vh;
`;