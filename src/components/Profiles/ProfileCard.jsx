import React, { useState } from 'react';
import styled from 'styled-components';
import * as SC from '../../styledComponents';
import Modal from '../commonComponents/Modal';
import AddProfile from './AddProfile';

export default function ProfileCard({ pfp, handleEditOpen, renderList }) {
  const [showQR, setShowQR] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleOpenQR = () => {
    setShowQR(true);
  };
  const handleCloseQR = () => {
    setShowQR(false);
  };

  const handleOpen = () => {
    setEditModal(true);
  };

  const handleClose = () => {
    setEditModal(false);
  };

  return (
   <ProfileCardDiv>
    <PictureContainer>
      <PFP src={pfp.photos[0]} style={{ objectFit: 'cover' }}></PFP>
      <EditIcon src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png' onClick={(e) => handleOpen() }></EditIcon>
    </PictureContainer>
    <DetailsContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <ProfileName>{pfp.name}</ProfileName>
          <GlobeIcon src="https://img.icons8.com/ios-glyphs/344/globe--v1.png" />
        </div>
        <QR onClick={(e) => {e.preventDefault(); handleOpenQR()}} src="https://img.icons8.com/external-fauzidea-detailed-outline-fauzidea/344/external-qr-code-e-commerce-fauzidea-detailed-outline-fauzidea.png"></QR>

      </div>
      <SubTitle>Description</SubTitle>
      <Desc>{pfp.description}</Desc>
      <SubTitle>Likes to..</SubTitle>
      <Desc>{pfp.likes}</Desc>
      <SubTitle>Disikes to..</SubTitle>
      <Desc>{pfp.dislikes}</Desc>
      <SubTitle>Traits</SubTitle>
      <div style={{ display: 'flex', padding: '5px 0' }}>
          {pfp.traits.map((name) => (
            <Trait color={traitColor[name]} key={name} >
              {name}
            </Trait>
          ))}
        </div>
    </DetailsContainer>
    <Modal open={showQR} onClose={handleCloseQR} title={'QR Code for your profile'}>
      <img src={`https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/Profile/${pfp.id}&size=150x150&bgcolor=FF8700&color=fff`} />
    </Modal>
    <Modal open={editModal} onClose={handleClose} title={'Add Profile'}>
        <AddProfile handleClose={handleClose} renderList={renderList} data={pfp} />
    </Modal>
   </ProfileCardDiv>
  )
}

const traitColor = {
  active: 'red',
  happy: 'orange',
  shy: 'skyblue',
  sleepy: 'green',
};

const PictureContainer = styled.div`
  width: 100%;
  height: 51%;
  position: relative;
`;

const DetailsContainer = styled.div`
  height: 49%;
  padding: 20px;
  box-sizing: border-box;
`;

const ProfileCardDiv = styled.div`
  /* display: relative; */
  /* width: 24.64vw; */
  width: 30%;
  /* height: 556px; */
  height: 500px;
  margin: 20px;
  background: #FFFFFF;
  box-shadow: 2px 2px 2px 2px rgb(0 0 0 / 10%);
  border-radius: 20px;
  /* border: 1px solid grey; */
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
  height: 30px;
  width: 30px;
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 10px;
  background-color: rgba(255,255, 255, 0.4);
  &:hover{
    background-color: rgba(255,255, 255, 0.8);
  };
`;

const ProfileName = styled.span`
  font-size: 1.1em;
`;

const GlobeIcon = styled.img`
  height: 20px;
  width: 20px;
  display: inline-block;
  top: 15px;
`;

const Pin = styled.img`
  height: 30px;
  width: 30px;
  display: inline-block;
`;

const QR = styled.img`
  height: 25px;
  width: 25px;
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

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding-top: 2%;
`;

const Desc = styled.div`
  font-size: 14px;
`;

const Trait = styled.div`
  padding: 0 5px;
  border: ${props => `1px solid ${props.color}`};
  border-radius: 20px;
  margin-right: 5px;
  font-size: 14px;
`;