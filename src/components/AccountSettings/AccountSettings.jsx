import React from 'react';
import { Link } from 'react-router-dom';

export default function AccountSettings (props) {

  return (
    <div>
      <h1>This is the Account Settings!</h1>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  )
}