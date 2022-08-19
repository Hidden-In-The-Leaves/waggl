import React, { useState } from 'react';
import styled from 'styled-components';
import * as SC from '../../styledComponents.js';
import Modal from '../commonComponents/Modal.jsx';

export default function SmallCard({ pfp, handleEditOpen }) {
  const [showQR, setShowQR] = useState(false);

  const handleOpenQR = () => {
    setShowQR(true);
  };
  const handleCloseQR = () => {
    setShowQR(false);
  };

  return (
   <ProfileCard onClick={(e) => {e.preventDefault(); setQR(pfp.id)}}>
    <PictureContainer>
      <PFP src={pfp.photos[0]} style={{ objectFit: 'cover' }}></PFP>
      <EditIcon src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png' onClick={(e) => {e.preventDefault(); handleEditOpen()}}></EditIcon>
    </PictureContainer>
    <DetailsContainer>
      <ProfileName>{pfp.name}<span><GlobeIcon src="https://img.icons8.com/ios-glyphs/344/globe--v1.png"></GlobeIcon></span></ProfileName><br></br>
      {/* <GlobeIcon src="https://img.icons8.com/ios-glyphs/344/globe--v1.png"></GlobeIcon> */}
      <Pin src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-pin-interface-kiranshastry-solid-kiranshastry-1.png"></Pin><br></br>
      <QR onClick={(e) => {e.preventDefault(); handleOpenQR()}} src="https://img.icons8.com/external-fauzidea-detailed-outline-fauzidea/344/external-qr-code-e-commerce-fauzidea-detailed-outline-fauzidea.png"></QR>
      <p>Description</p>
      <p>{pfp.dislikes}</p>
      <p>Likes</p>
      <p>{pfp.likes}</p>
      <p>Disikes</p>
      <p>{pfp.dislikes}</p>
      <p>Traits</p>
      <div style={{ display: 'flex', padding: '10px 0' }}>
          {pfp.traits.map((name) => (
            <div>
              {name}
            </div>
          ))}
        </div>
    </DetailsContainer>
    <Modal open={showQR} onClose={handleCloseQR} title={'QR Code for your profile'}>
      <img src={`https://api.qrserver.com/v1/create-qr-code/?data=localhost:3000/Profile/19&size=150x150&bgcolor=FF8700&color=fff`} />
    </Modal>
   </ProfileCard>
  )
}

const PictureContainer = styled.div`
  width: 100%;
  height: 51%;
`;

const DetailsContainer = styled.div`
  height: 49%;
  width: 90%;
  padding-left: 10px;
`;

const ProfileCard = styled.div`
  /* display: relative; */
  /* width: 24.64vw; */
  width: 32%;
  /* height: 556px; */
  height: 750px;
  left: 115px;
  top: 222px;
  margin-top: 10px;
  margin-bottom: 10px;


  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const PFP = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  max-height: 100%;
  min-height: 100%;
`;

const EditIcon = styled.img`
position: relative;
height: 30px;
width: 30px;
/* left: 330px;
bottom: 283px; */
left: 333px;
bottom: 380px;
&:hover{background-color: rgba(255, 135, 0, 0.8); border-radius: 10px; opacity: };
`;

const ProfileName = styled.div`
  width: 80%;
  padding-left: 10px;
  font-weight: 400;
  font-family: 'Lato', Helvetica, sans-serif;
  font-size: 1.25em;
`;

const GlobeIcon = styled.img`
  height: 30px;
  width: 30px
  display: inline-block;
  top: 15px;
`;

const Pin = styled.img`
  height: 30px;
  width: 30px;
  display: inline-block;
`;

const QR = styled.img`
  height: 30px;
  width: 30px;
  display: inline-block;
`;

const CheckButton = styled.input`
  position: absolute;
  top: -20px;
  &:checked + label {
    background-color: #FF8700;
    color: white;
  }
`;

const ButtonDiv = styled.div`
  /* border-radius: 20px;
  border: 1px solid #AFAFAF;
  background: white;
  width: 70px;
  margin-right: 10px; */
  margin:4px;
  background-color: ${pfp => pfp.checked ? '#FF8700' : 'white'};
  color: ${pfp => pfp.checked ? 'white' : 'black'};
  border-radius: 20px;
  border:1px solid #D0D0D0;
  overflow:auto;
  float:left;
`;