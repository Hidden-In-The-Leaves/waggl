import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as SC from '../../styledComponents.js';

export default function AddProfile(props) {
  return (
    <div>
      <h1>Create this Dog Profile</h1>
      <div>
        <SC.Title>Add Profile</SC.Title>
        <SC.SubTitle>Basic Information</SC.SubTitle>
        <label>Name</label>
        <input type="text"></input>
        <label>Age</label>
        <input type="text"></input><br></br>
        <label>Description</label><br></br>
        <input type="text"></input><br></br>
        <label>Personality Traits</label><br></br>
        <div></div>
        <label>Likes to ...</label><br></br>
        <input type="text"></input><br></br>
        <label>Dislikes ...</label><br></br>
        <input type="text"></input><br></br>
        <label>Photos</label><br></br>
        <input type="file"></input>
        <button onClick={console.log('submit photos')}>Add Photos</button>
        <SC.SubTitle>Profile Visibility</SC.SubTitle>
        <button>Public</button>
        <button>Private</button>
        <button>Create</button>
      </div>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  )
}