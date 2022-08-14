import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function HomePage (props) {

  return (
    <div>
      <h1>This is the Home Page!</h1>
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
