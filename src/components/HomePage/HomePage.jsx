import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PackBar from './PackBar/PackBar';
import NavBar from '../NavBar/NavBar';
import Feed from './Feed/Feed';

import { usePackStore, usePostsStore } from './Store';

export default function HomePage() {
  const resetPacks = usePackStore((state) => state.resetPack);
  const getPosts = usePostsStore((state) => state.getPosts);

  useEffect(() => {
    resetPacks(1);
    getPosts(1);
  }, []);

  return (
    <PageContainer>
      <NavBar type="home" />
      {/* <h1>This is the Home Page!</h1> */}
      <Cols>
        <PackBar />
        <Feed />
      </Cols>
      {/* <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link> */}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  overflow-y: hidden;
  max-height: 100vh;
`;

const Cols = styled.div`
  display: flex;
  flex-direction: row;
`;
