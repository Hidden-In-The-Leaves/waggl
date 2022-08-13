import React from 'react';
import { Link } from 'react-router-dom';


export default function App () {
  return (
    <div>
      <h1>This is the app!</h1>
      {/* to use react router you can wrap elements in a link component
      and use a route by setting attribute "to" equal
      to a route that is found in index.js*/}
      <Link to="/LogIn">
        <button>This is a Link to Log In "Page"!</button>
      </Link>
    </div>
  )
}