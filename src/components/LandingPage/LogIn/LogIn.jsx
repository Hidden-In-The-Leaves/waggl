import React from 'react';
import { Link } from 'react-router-dom';

export default function LogIn (props) {

  return (
    <div>
      <h1>Log in here!</h1>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  )
}