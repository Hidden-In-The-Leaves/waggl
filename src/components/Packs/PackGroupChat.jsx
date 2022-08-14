import React from 'react';
import { Link } from 'react-router-dom';

export default function PackGroupChat (props) {

  return (
    <div>
      <h1>This is the Pack GroupChat!</h1>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  )
}