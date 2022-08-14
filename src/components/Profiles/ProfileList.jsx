import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileList (props) {

  return (
    <div>
      <h1>This is the Profile List!</h1>
      <div>Put Profile Cards here?</div>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  )
}