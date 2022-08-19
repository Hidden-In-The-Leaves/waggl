import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as SC from '../../styledComponents.js';
import AddPictureCard from './AddPictureCard';
import uploadPhoto from '../../lib/uploadPhoto';
import { useUserStore } from '../Store';

export default function AddProfile({ handleClose, renderList }) {
  const userInfo = useUserStore((state) => state.userInfo);
  const [formValue, setFormValue] = useState({});
  const [personalities, setPersonalities] = useState({
    happy: false,
    active: false,
    sleepy: false,
    shy: false,
  });
  const [images, setImages] = useState([]);

  const tempImageArray = ['', '', '', '', '', ''];

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckChange = (e) => {
    setPersonalities({
      ...personalities,
      [e.target.value]: e.target.checked,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const uploadPromises = [];
    images.forEach((image) => {
      uploadPromises.push(uploadPhoto(image));
    });

    Promise.all(uploadPromises)
      .then((urls) => {
        const config = {
          method: 'POST',
          url: '/api/profile',
          data: {
            ...formValue,
            photos: urls,
            user_id: userInfo.id,
            personality: personalities,
          },
        };
        axios(config)
          .then(() => {
            handleClose();
            // renders list ( like get all profiles again )
            renderList();
          })
          .catch((err) => console.log('error posting profile', err));
      })
      .catch((err) => console.log('error uploading photo', err));
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={submitHandler}>
      <SC.SectionTitle>Basic Information</SC.SectionTitle>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SC.InputLabel style={{ width: '40%' }}>
          Name
          <SC.Input type="text" name="name" onChange={handleChange} required />
        </SC.InputLabel>
        <SC.InputLabel style={{ width: '15%' }}>
          Age
          <SC.Input type="number" name="age" onChange={handleChange} required />
        </SC.InputLabel>
        <SC.InputLabel style={{ width: '22%' }}>
          Gender
          <Select name="gender" onChange={handleChange} required>
            <option value="">-- Choose One --</option>
            <option>Female</option>
            <option>Male</option>
          </Select>
        </SC.InputLabel>
        <SC.InputLabel style={{ width: '18%' }}>
          Size
          <Select name="size" onChange={handleChange} required>
            <option value="">-- Choose One --</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </Select>
        </SC.InputLabel>
      </div>
      <SC.InputLabel>
        Description
        <SC.TextArea style={{ height: '100px' }} name="description" onChange={handleChange} />
      </SC.InputLabel>
      <SC.InputLabel>
        Personality
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
      </SC.InputLabel>
      <SC.InputLabel>
        Likes to...
        <SC.Input type="text" name="likes" onChange={handleChange} />
      </SC.InputLabel>
      <SC.InputLabel>
        Dislikes to...
        <SC.Input type="text" name="dislikes" onChange={handleChange} />
      </SC.InputLabel>
      <SC.SectionTitle>
        Photos
      </SC.SectionTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {images.map((image) => <PhotoContainer src={image} />)}
        {tempImageArray
          .slice(0, tempImageArray.length - images.length)
          .map((image, index) => {
            if (!index) {
              return <AddPictureCard key={index} setImage={(i) => setImages([...images, i])} />;
            }
            return <PhotoContainer key={index} />;
          })}
      </div>
      {/* <SC.SectionTitle>Profile Visibility</SC.SectionTitle>
      <div style={{ display: 'flex' }}>
        <SC.InputLabel>
          <input type="radio" name="
        </SC.InputLabel>
        <div>
          <button type="button">Public</button>
          <p style={{ fontSize: '14px', paddingRight: '10%' }}>When your profile is public, it allows other users to view your dog’s profile on discover mode.</p>
        </div>
        <div>
          <button type="button">Private</button>
          <p style={{ fontSize: '14px', paddingRight: '10%' }}>When your profile is private, it hides your dog’s profile from other users on discover mode.</p>
        </div>
      </div> */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SC.Button type="submit" style={{ width: '20%', margin: '3% 0' }}>Create</SC.Button>
      </div>
    </form>
  )
}

const PhotoContainer = styled.img`
  border: 1px solid #AFAFAF;
  border-radius: 20px;
  width: 30%;
  height: 180px;
  margin: 1%;
  object-fit: cover;
`;

const Select = styled.select`
  border: 1px solid #9F9F9F;
  border-radius: 10px;
  margin: 5px 0 15px 0;
  height: 40px;
  ::placeholder {
    color: #9A9A9A;
    font-size: 16px;
  }
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