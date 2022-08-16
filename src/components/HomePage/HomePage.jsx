import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PackBar from './PackBar/PackBar';
import NavBar from '../NavBar/NavBar';
import { usePackStore } from './Store';

export default function HomePage() {
  const resetPacks = usePackStore((state) => state.resetPack);

  useEffect(() => {
    resetPacks(1);
  }, []);

  return (
    <div>
      <NavBar type="home" />
      {/* <h1>This is the Home Page!</h1> */}
      <PackBar />
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  );
}
