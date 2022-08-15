import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserInfoSettings(props) {
  const [userEdit, setUserEdit] = useState([]);
  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});


  handleUserInformationEdit = (event) => {
    setUserEdit(true);
  };

  handleUserInformationUpdate = (event) => {
    event.preventDefault();

    // send updated info to server
    const config = {
      method: 'PUT',
      url: '/accountSettings/userInfo',
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }
    }

    axios(config)
      .then(() => {
        getUserInfo();
      })
      .catch(err => console.log(err));

    setUserEdit(false);
  };

  handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  getUserInfo = () => {
    const config = {
      method: 'GET',
      url: 'accountSettings/userInfo'
    }

    axios(config)
    .then((res) => {
      setUserInfo(res.data);
    })
    .catch(err => console.log(err));
  };

  setUserInfo = (data) => {
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setEmail(data.email);
    setPassword('password');
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
      <button onClick={handleUserInformationEdit}>Edit User Information</button>

      <form onSubmit={handleUserInformationUpdate}>
        <fieldset disabled={!userEdit}>
          <label>
            First Name
            <input type="text" value={firstName}></input>
          </label>
          <label>
            Last Name
            <input type="text" value={lastName}></input>
          </label>
          <label>
            Email
            <input type="text" value={email}></input>
          </label>
          <label>
            Password
            <input type="password" value={password}></input>
          </label>
          <input type="submit" value="Update User Information"></input>
        </fieldset>
      </form>
    </div>
  );
};