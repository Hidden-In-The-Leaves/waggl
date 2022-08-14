import React from 'react';
import styled from 'styled-components';
import PackItem from './PackItem';

function PackList({ title, packList }) {
  return (
    <div>
      <div>
        {title}
      </div>
      {packList.map((pack) => <PackItem key={pack.id} pack={pack} />)}
    </div>
  )
}