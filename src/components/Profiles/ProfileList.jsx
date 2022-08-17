import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { Title } from '../../styledComponents.js';


export default function ProfileList(props) {
  return (
    <PageContainer>
      {/* <h1>This is the Profile List!</h1> */}
      <NavBar type="home" />
      <Title>Profiles</Title>
      {/* <div>Put Profile Cards here?</div> */}
      <ProfileCard>
        <PFP src='https://cdn.webshopapp.com/shops/271423/files/325744194/is-your-dog-a-happy-dog-ways-to-know.jpg'></PFP>
        <EditIcon src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png'></EditIcon>
      </ProfileCard>
      <ProfileCard>
        <PFP src='https://cdn.broadsheet.com.au/cache/c5/72/c5725cc5e42fdb9025c8631f1739873b.jpg'></PFP>
        <EditIcon src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png'></EditIcon>
      </ProfileCard>
      <ProfileCard>
        <PFP src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmwbVhf4Xlxq_Q2UyiSyb3In4NUHyDJnAiKw&usqp=CAU'></PFP>
        <EditIcon src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png'></EditIcon>
      </ProfileCard>
      <ProfileCard>
        <PFP src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmwbVhf4Xlxq_Q2UyiSyb3In4NUHyDJnAiKw&usqp=CAU'></PFP>
        <EditIcon src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png'></EditIcon>
      </ProfileCard>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  /* overflow-y: hidden; */
  max-height: 100vh;
  /* display: flex;
  flex-direction: row;
  justify-content: space-between; */
`;

const ProfileCard = styled.div`
  display: relative;
  width: 24.64vw;
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
  left: 21.5%;
  /* top: 3%; */
  /* top: 10px; */
  height: 30px;
  width: 30;
`;
