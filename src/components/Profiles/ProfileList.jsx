import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { Title } from '../../styledComponents.js';
import AddCard from './AddCard';
import ProfileCard from './ProfileCard';
import AddProfile from './AddProfile';
import EditProfile from './EditProfile';
import Modal from '../commonComponents/Modal.jsx';

export default function ProfileList(props) {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [profileData, setProfileData] = useState({});
  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleEditOpen = () => {
    setEditModal(true);
  };
  const handleEditClose = () => {
    setEditModal(false);
  };

  const dogPhotos = [
    'https://cdn.webshopapp.com/shops/271423/files/325744194/is-your-dog-a-happy-dog-ways-to-know.jpg',
    'https://cdn.broadsheet.com.au/cache/c5/72/c5725cc5e42fdb9025c8631f1739873b.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmwbVhf4Xlxq_Q2UyiSyb3In4NUHyDJnAiKw&usqp=CAU',
    'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=662&q=80',
  ];
  return (
    <PageContainer>
      {/* <h1>This is the Profile List!</h1> */}
      <NavBar type="home" />
      <Title>Profiles</Title>
      <div className="card-container" style={{ display: 'flex', justifyContent: 'space-between' }}>

          {dogPhotos.map((item, index) => {return <ProfileCard key={index} pfp={item} handleEditOpen={handleEditOpen}/>})}

        <AddCard handleOpen={handleOpen} />
      </div>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
      <Modal open={showModal} onClose={handleClose} title={'Modal add Testing!'}>
        <AddProfile profileData={profileData} setProfileData={setProfileData} />
      </Modal>
      <Modal open={editModal} onClose={handleEditClose} title={'Modal edit Testing!'}>
        <EditProfile profileData={profileData} setProfileData={setProfileData} />
      </Modal>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  overflow-y: scroll;
  max-height: 100vh;
  /* display: flex; */
  /* flex-direction: row; */
  /* justify-content: space-between; */
`;

// const ProfileCard = styled.div`
//   display: relative;
//   /* width: 24.64vw; */
//   width: 32%;
//   height: 556px;
//   left: 115px;
//   top: 222px;


//   background: #FFFFFF;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 20px;
// `;

const PFP = styled.img`
  position: relative;
  height: 51%;
  resize: auto;
  width: 100%;
  border-radius: 20px;
`;

const EditIcon = styled.img`
  position: relative;
  display: inline-block;
  /* left: 21.5%; */
  /* top: 3%; */
  /* top: 10px; */
  height: 30px;
  width: 30px;
`;
