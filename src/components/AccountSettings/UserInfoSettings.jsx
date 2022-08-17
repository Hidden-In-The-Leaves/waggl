/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserInfoSettings() {
  const [userEdit, setUserEdit] = useState([]);
  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  const handleUserInformationEdit = () => {
    setUserEdit(true);
  };

  const setUserInfo = (data) => {
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setEmail(data.email);
    setPassword('password');
  };

  const getUserInfo = () => {
    const config = {
      method: 'GET',
      url: '/api/accountSettings/userInfo',
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
      url: '/api/accountSettings/userInfo',
      data: {
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
    if (userEdit.length === 0) {
      setUserEdit(false);
    }
    if (typeof firstName === 'object') {
      getUserInfo();
    }
    if (typeof password === 'object') {
      setPassword('password');
    }
  });

  return (
    <div>
      <h2>User Information</h2>
      <button type="button" onClick={handleUserInformationEdit}>Edit User Information</button>

      <form onSubmit={handleUserInformationUpdate}>
        <fieldset disabled={!userEdit}>
          <label>
            First Name
            <input type="text" value={firstName} onChange={handleFirstNameChange} />
          </label>
          <label>
            Last Name
            <input type="text" value={lastName} onChange={handleLastNameChange} />
          </label>
          <label>
            Email
            <input type="text" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <input type="submit" value="Update User Information" />
        </fieldset>
      </form>
    </div>
  );
}