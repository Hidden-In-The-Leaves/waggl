import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PackBar from './PackBar';
import NavBar from '../NavBar/NavBar';
import { usePackStore } from './Store';

export default function HomePage (props) {
  const resetPacks = usePackStore((state) => state.resetPack);

  useEffect(() => {
    console.log('inside use effect')
    resetPacks();
  }, []);

  return (
    <div>
      <NavBar type="home"/>
      {/* <h1>This is the Home Page!</h1> */}
      <PackBar />
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  )
}

const SubTitle = styled.div`
  font-size: 32px;
  font-weight: 800;
`;