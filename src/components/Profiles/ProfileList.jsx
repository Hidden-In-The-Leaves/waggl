import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Title, Container } from '../../styledComponents.js';
import AddCard from './AddCard';
import ProfileCard from './ProfileCard';
import AddProfile from './AddProfile';
import Modal from '../commonComponents/Modal.jsx';
import axios from 'axios';
import { useUserStore } from '../Store';

// route for qr url `localhost:3000/Profile/`

export default function ProfileList(props) {
  const userInfo = useUserStore((state) => state.userInfo);
  const [showModal, setShowModal] = useState(false);
  // const [editModal, setEditModal] = useState(false);
  // const [profileData, setProfileData] = useState({});
  const [dogs, setDogs] = useState([]);

  const getDogs = () => {
    axios({
      method: 'get',
      url: '/api/profile/dogs',
      params: {user_id: userInfo.id},
    })
      .then((res) => {
        setDogs(res.data);
      })
      .catch((err) => {console.log('🟥Error on useEffect fetching dog profiles', err)})
  };

  useEffect(() => {
    if (userInfo.id) {
      getDogs();
    }
  }, [userInfo]);

  const imageTransform = () => {
    axios({
      method: 'get',
      url: `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    })
      .then()
      .catch((err) => {
        console.log('🟥There was an error converting image to url', err);
      });
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <Title style={{ marginLeft: '3%' }}>Profiles</Title>
      <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', spaceBetween: '10px', width: '90vw', margin: 'auto', gap: '10px 0px 10px 0px' }}>
          {/* {dogPhotos.map((item, index) => {return <ProfileCard key={index} pfp={item} handleEditOpen={handleEditOpen} handleOpenQR={handleOpenQR} />})} */}
          {dogs.map((item, index) => {return <ProfileCard key={index} pfp={item} renderList={getDogs} />})}

        <AddCard handleOpen={handleOpen} />
      </div>
      <Modal open={showModal} onClose={handleClose} title={'Add Profile'}>
        <AddProfile handleClose={handleClose} renderList={getDogs} />
      </Modal>
      {/* <Modal open={editModal} onClose={handleEditClose} title={'Modal edit Testing!'}>
        <EditProfile profileData={profileData} setProfileData={setProfileData} />
      </Modal> */}
    </Container>
  );
}

const PageContainer = styled.div`
  /* overflow-y: scroll; */
  max-height: 100vh;
  /* width: 90vw; */
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
