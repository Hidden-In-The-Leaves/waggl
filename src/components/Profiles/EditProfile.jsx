import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as SC from '../../styledComponents.js';

export default function EditProfile(props) {
  return (
    <div>
      <h1>Edit this Dog Profile</h1>
      <form>
        <SC.Title>Add Profile</SC.Title>
        <SC.SubTitle>Basic Information</SC.SubTitle>
        <label>Name</label>
        <input></input>
        <label>Age</label>
        <input></input><br></br>
        <label>Description</label><br></br>
        <input></input><br></br>
        <label>Personality Traits</label><br></br>
        <div></div>
        <label>Likes to ...</label><br></br>
        <input></input><br></br>
        <label>Dislikes ...</label><br></br>
        <input></input><br></br>
        <SC.SubTitle>Profile Visibility</SC.SubTitle>
        <button>Public</button>
        <button>Private</button>
        <button>Create</button>
      </form>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  )
}