import React from 'react';
import styled from 'styled-components';
import PackItem from './PackItem';
import { SectionTitle } from '../../styledComponents';

export default function PackList({ title, packs }) {
  return (
    <Div>
      <SectionTitle>
        {title}
      </SectionTitle>
      {packs.map((pack) => <PackItem key={pack.id} pack={pack} />)}
    </Div>
  )
}

const Div = styled.div`
  margin: 30px 0;
`;