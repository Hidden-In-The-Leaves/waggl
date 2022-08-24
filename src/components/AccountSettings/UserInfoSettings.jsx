/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useUserStore } from '../Store';

import {
  InputLabel, SectionTitle, Input,
} from '../../styledComponents';

export default function UserInfoSettings() {
  const [userEdit, setUserEdit] = useState([]);
  const [profilePicture, setProfilePicture] = useState([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState([]);
  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  const userInfo = useUserStore((state) => state.userInfo);

  const handleUserInformationEdit = () => {
    setUserEdit(true);
  };

  const setUserInfo = (data) => {
    if (data.profile_pic_url === undefined) {
      setProfilePictureUrl('https://upload.wikimedia.org/wikipedia/commons/4/43/Cute_dog.jpg');
    } else {
      setProfilePictureUrl(data.profile_pic_url);
    }
    if (data.first_name === undefined) {
      setFirstName('');
    } else {
      setFirstName(data.first_name);
    }
    if (data.last_name === undefined) {
      setLastName('');
    } else {
      setLastName(data.last_name);
    }
    if (data.email === undefined) {
      setEmail('');
    } else {
      setEmail(data.email);
    }
    setPassword('password');
  };

  const getUserInfo = () => {
    const config = {
      method: 'GET',
      url: `/api/accountSettings/userInfo/${userInfo.id}`,
    };

    axios(config)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleUserInformationUpdate = (event) => {
    event.preventDefault();

    // send updated info to server
    const config = {
      method: 'PUT',
      url: `/api/accountSettings/userInfo/${userInfo.id}`,
      data: {
        profile_picture_url: profilePictureUrl,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      },
    };

    axios(config)
      .then(() => {
        getUserInfo();
        setUserEdit(false);
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (event) => {
    console.log(typeof event.target.files);
    setProfilePicture([event.target.files]);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userEdit.length === 0) {
      setUserEdit(false);
    }
    if (typeof firstName === 'object') {
      getUserInfo();
    }
    if (typeof password === 'object') {
      setPassword('password');
    }
    if (profilePicture.length > 0) {
      console.log(typeof profilePicture[0][0], profilePicture[0][0]);
      setProfilePictureUrl(URL.createObjectURL(profilePicture[0][0]));
    }
  });

  return (
    <div style={{ minWidth: 500 }}>
      <SectionTitle>User Information</SectionTitle>
      <Button type="button" onClick={handleUserInformationEdit}>Edit User Information</Button>

      <br />

      <form style={{ margin: 50 }} onSubmit={handleUserInformationUpdate}>
        <fieldset disabled={!userEdit}>
          <ProfilePicture src={profilePictureUrl} alt="profile" />
          <InputLabel>
            Profile Picture
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </InputLabel>
          <InputLabel>
            First Name
            <input type="text" value={firstName} onChange={handleFirstNameChange} />
          </InputLabel>
          <InputLabel>
            Last Name
            <Input type="text" value={lastName} onChange={handleLastNameChange} />
          </InputLabel>
          <InputLabel>
            Email
            <Input type="text" value={email} onChange={handleEmailChange} />
          </InputLabel>
          <InputLabel>
            Password
            <Input type="password" value={password} onChange={handlePasswordChange} />
          </InputLabel>
          <Button type="submit">Update User Information</Button>
        </fieldset>
      </form>
    </div>
  );
}

const ProfilePicture = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 300px;
  margin: 20px 350px 20px;
  object-fit: cover;
`;

const Button = styled.button`
  color: white;
  background-color: #FF8700;
  border-radius: 30px;
  padding: 3px 10px;
  margin: 5px;
  border-radius: 30px;
  border-color: #FF8700;
  border-style: solid;
  width: 200px;
  height: 50px;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;
