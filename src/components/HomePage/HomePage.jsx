import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PackBar from './PackBar';
import NavBar from '../NavBar/NavBar';

export default function HomePage (props) {

  return (
    <div>
      <NavBar type="home"/>
      {/* <h1>This is the Home Page!</h1> */}
      <PackBar packs={samplePackData} />
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


const samplePackData = [
  {
    id: 1,
    name: 'Pug Lovers',
    description: 'If you are a #pug lover then plz do support and join with us🥰🥰 support and enjoy our group',
    photo: 'https://images.unsplash.com/photo-1523626797181-8c5ae80d40c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
  },
  {
    id: 2,
    name: 'Dogs Are Family',
    description: 'Welcome to coolest group of dog lovers on Facebook! Everyone is encouraged to share pictures and videos or ask for tips and advice from your fellow dog loving community members! ',
    photo: 'https://images.unsplash.com/photo-1529472119196-cb724127a98e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=672&q=80',
  }
]