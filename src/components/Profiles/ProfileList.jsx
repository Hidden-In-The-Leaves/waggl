import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Title } from '../../styledComponents.js';
import AddCard from './AddCard';
import ProfileCard from './ProfileCard';
import AddProfile from './AddProfile';
import EditProfile from './EditProfile';
import Modal from '../commonComponents/Modal.jsx';
import axios from 'axios';
import { useUserStore } from '../Store';

export default function ProfileList(props) {
  const userInfo = useUserStore((state) => state.userInfo);
  // const url = `localhost:8080/profile/user_id:${id}`;
  const url = `localhost:8080/`;
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [showQR, setShowQR] = useState(false);
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    console.log('user id', userInfo.id);
    axios({
      method: 'get',
      url: '/api/profile/dogs',
      params: {user_id: userInfo.id},
    })
      .then((res) => {
        console.log(res.data);
        setDogs(res.data);
      })
      .catch((err) => {console.log('🟥Error on useEffect fetching dog profiles', err)})
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

  const handleEditOpen = () => {
    setEditModal(true);
  };
  const handleEditClose = () => {
    setEditModal(false);
  };

  const handleOpenQR = () => {
    setShowQR(true);
  };
  const handleCloseQR = () => {
    setShowQR(false);
  };

  const dogPhotos = [
    'https://cdn.webshopapp.com/shops/271423/files/325744194/is-your-dog-a-happy-dog-ways-to-know.jpg',
    'https://cdn.broadsheet.com.au/cache/c5/72/c5725cc5e42fdb9025c8631f1739873b.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmwbVhf4Xlxq_Q2UyiSyb3In4NUHyDJnAiKw&usqp=CAU',
    'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=662&q=80',
  ];
  return (
    <PageContainer>
      <Title>Profiles</Title>
      <div className="card-container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', spaceBetween: '10px', width: '90vw', margin: 'auto', gap: '10px 0px 10px 0px' }}>

          {/* {dogPhotos.map((item, index) => {return <ProfileCard key={index} pfp={item} handleEditOpen={handleEditOpen} handleOpenQR={handleOpenQR} />})} */}
          {dogs.map((item, index) => {return <ProfileCard key={index} pfp={item} handleEditOpen={handleEditOpen} handleOpenQR={handleOpenQR} />})}

        <AddCard handleOpen={handleOpen} />
      </div>
      {/* <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link> */}
      <Modal open={showModal} onClose={handleClose} title={'Add Profile'}>
        <AddProfile profileData={profileData} setProfileData={setProfileData} handleClose={handleClose} />
      </Modal>
      <Modal open={editModal} onClose={handleEditClose} title={'Modal edit Testing!'}>
        <EditProfile profileData={profileData} setProfileData={setProfileData} />
      </Modal>
      <Modal open={showQR} onClose={handleCloseQR} title={'QR Code for your profile'}>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150&bgcolor=FF8700&color=fff`} />
      </Modal>
    </PageContainer>
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
