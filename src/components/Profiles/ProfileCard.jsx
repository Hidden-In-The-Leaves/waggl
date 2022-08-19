import React from 'react';
import styled from 'styled-components';
import * as SC from '../../styledComponents.js';

export default function SmallCard(props) {
  return (
   <ProfileCard>
    <PFP src={props.pfp}></PFP>
    <EditIcon src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png' onClick={(e) => {e.preventDefault(); props.handleEditOpen()}}></EditIcon>
    <ProfileName>Doggie</ProfileName>
    <GlobeIcon src="https://img.icons8.com/ios-glyphs/344/globe--v1.png"></GlobeIcon>
    <Pin src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-pin-interface-kiranshastry-solid-kiranshastry-1.png"></Pin>
    <h5>Description</h5>
    <p>Shy for all of 5 minutes before I will play chase around the dog park</p>
    <h5>Likes</h5>
    <p>When you drop pizza on the floor near me</p>
    <h5>Disikes</h5>
    <p>The Vet's office</p>
    <h5>Traits</h5>
   </ProfileCard>
  )
}

const ProfileCard = styled.div`
  /* display: relative; */
  /* width: 24.64vw; */
  width: 32%;
  height: 556px;
  left: 115px;
  top: 222px;


  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const PFP = styled.img`
  position: relative;
  height: 51%;
  width: 100%;
  border-radius: 20px;
`;

const EditIcon = styled.img`
  position: absolute;
  /* padding-right: -5px; */
  /* left: 21.5%; */
  /* top: 3%; */
  bottom: 10px;
  /* right: 10px; */
  height: 30px;
  width: 30px;
`;

const ProfileName = styled.div`
  width: 80%;
  padding-left: 10px;
  font-weight: 400;
  font-family: 'Lato', Helvetica, sans-serif;
  font-size: 1.5em;
`;

const GlobeIcon = styled.img`
  height: 30px;
  width: 30px
  display: inline-block;
`;

const Pin = styled.img`
  height: 30px;
  width: 30px;
  display: block;
`;