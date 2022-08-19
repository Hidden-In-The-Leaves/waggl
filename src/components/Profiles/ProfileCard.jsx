import React from 'react';
import styled from 'styled-components';
import * as SC from '../../styledComponents.js';

export default function SmallCard(props) {
  return (
   <ProfileCard onClick={(e) => {e.preventDefault(); props.setQR(props.id)}}>
    <PictureContainer>
      <PFP src={props.photos[0]}></PFP>
      <EditIcon src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png' onClick={(e) => {e.preventDefault(); props.handleEditOpen()}}></EditIcon>
    </PictureContainer>
    <DetailsContainer>
      <ProfileName>{props.name}<span><GlobeIcon src="https://img.icons8.com/ios-glyphs/344/globe--v1.png"></GlobeIcon></span></ProfileName><br></br>
      {/* <GlobeIcon src="https://img.icons8.com/ios-glyphs/344/globe--v1.png"></GlobeIcon> */}
      <Pin src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-pin-interface-kiranshastry-solid-kiranshastry-1.png"></Pin><br></br>
      <QR onClick={(e) => {e.preventDefault(); props.handleOpenQR()}} src="https://img.icons8.com/external-fauzidea-detailed-outline-fauzidea/344/external-qr-code-e-commerce-fauzidea-detailed-outline-fauzidea.png"></QR>
      <p>Description</p>
      <p>{props.dislikes}</p>
      <p>Likes</p>
      <p>{props.likes}</p>
      <p>Disikes</p>
      <p>{props.dislikes}</p>
      <p>Traits</p>
      <div style={{ display: 'flex', padding: '10px 0' }}>
          {Object.keys(personalities).map((name) => (
            <ButtonDiv checked={personalities[name]}>
              <label style={{ float: 'left', width: '4.0em' }}>
                <CheckButton type="checkbox" value={name} onChange={handleCheckChange} />
                <div style={{ textAlign: 'center', fontSize: '14px' }}>{name}</div>
              </label>
            </ButtonDiv>
          ))}
        </div>
    </DetailsContainer>
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
  background-color: ${props => props.checked ? '#FF8700' : 'white'};
  color: ${props => props.checked ? 'white' : 'black'};
  border-radius: 20px;
  border:1px solid #D0D0D0;
  overflow:auto;
  float:left;
`;