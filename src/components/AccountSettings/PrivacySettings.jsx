import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacySettings (props) {

  return (
    <div>
      <h1>This is the Privacy Settings!</h1>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  )
}