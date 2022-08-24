import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as SC from '../../styledComponents.js';
import AddPictureCard from './AddPictureCard';
import uploadPhoto from '../../lib/uploadPhoto';
import { useUserStore } from '../Store';

export default function AddProfile({ handleClose, renderList, data }) {
  const userInfo = useUserStore((state) => state.userInfo);
  const [formValue, setFormValue] = useState(data || {});
  const [personalities, setPersonalities] = useState({
    happy: false,
    active: false,
    sleepy: false,
    shy: false,
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data) {
      const newPersonalities = {...personalities};
      data.traits.forEach((trait) => {
        newPersonalities[trait] = true;
      });
      setPersonalities(newPersonalities);
    }
  }, []);

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
          const per = [];
          for (let key in personalities) {
            if (personalities[key]) per.push(key);
          }
          const config = {
            method: 'POST',
            url: '/api/profile',
            data: {
              ...formValue,
              photos: urls,
              user_id: userInfo.id,
              personalities: per,
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
          <SC.Input type="text" name="name" onChange={handleChange} required value={formValue.name} />
        </SC.InputLabel>
        <SC.InputLabel style={{ width: '15%' }}>
          Age
          <SC.Input type="number" name="age" onChange={handleChange} required value={formValue.age} />
        </SC.InputLabel>
        <SC.InputLabel style={{ width: '22%' }}>
          Gender
          <Select name="gender" onChange={handleChange} required defaultValue={formValue.gender}>
            <option value="">-- Choose One --</option>
            <option>Female</option>
            <option>Male</option>
          </Select>
        </SC.InputLabel>
        <SC.InputLabel style={{ width: '18%' }}>
          Size
          <Select name="size" onChange={handleChange} required defaultValue={formValue.size}>
            <option value="">-- Choose One --</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </Select>
        </SC.InputLabel>
      </div>
      <SC.InputLabel>
        Description
        <SC.TextArea style={{ height: '100px' }} name="description" onChange={handleChange} value={formValue.description} />
      </SC.InputLabel>
      <SC.InputLabel>
        Personality
        <div style={{ display: 'flex', padding: '10px 0' }}>
          {Object.keys(personalities).map((name) => (
            <ButtonDiv checked={personalities[name]} key={name}>
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
        <SC.Input type="text" name="likes" onChange={handleChange} value={formValue.likes} />
      </SC.InputLabel>
      <SC.InputLabel>
        Dislikes to...
        <SC.Input type="text" name="dislikes" onChange={handleChange} value={formValue.dislikes} />
      </SC.InputLabel>
      <SC.SectionTitle>
        Photos
      </SC.SectionTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {data && data.photos.map((image, index) => <PhotoContainer src={image} key={`${image}${index}`} />)}
        {images.map((image, index) => <PhotoContainer src={image} key={`${image}${index}`} />)}
        {tempImageArray
          .slice(0, tempImageArray.length - images.length - (data?.photos.length || 0))
          .map((image, index) => {
            if (!index) {
              return <AddPictureCard key={`${image}${index}`} setImage={(i) => setImages([...images, i])} />;
            }
            return <PhotoContainer key={`${image}${index}`} />;
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
        <SC.Button type="submit" style={{ width: '20%', margin: '3% 0' }}>{data ? 'Edit' : 'Create'}</SC.Button>
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