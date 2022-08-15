import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function GeneralAccountSettings(props) {

  const [userEdit, setUserEdit] = useState([]);
  const [locationEdit, setLocationEdit] = useState([]);

  // If one section is being edited, the edit button on the other section is disabled.
  // This route has been temporarily edited to not require a user id

  handleUserInformationEdit = (event) => {
    setUserEdit(true);
  };

  handleUserInformationUpdate = (event) => {
    event.preventDefault();

    // send updated info to server

    setUserEdit(false);
  };

  handleLocationSettingsEdit = (event) => {
    setLocationEdit(true);
  };

  handleLocationSettingsUpdate = (event) => {
    event.preventDefault();

    // send updated info to server

    setLocationEdit(false);
  };

  useEffect(() => {
    if (userEdit.length === 0) {
      setUserEdit(false);
    }
    if (locationEdit.length === 0) {
      setLocationEdit(false);
    }
  });

  return (
    <div>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
      <h1>General Account Settings</h1>

      <br></br>

      <h2>User Information</h2>
      <button onClick={handleUserInformationEdit} disabled={locationEdit}>Edit User Information</button>

      <form onSubmit={handleUserInformationUpdate}>
        <fieldset disabled={!userEdit}>
          <label>
            First Name
            <input type="text" value="<USERS FIRST NAME>"></input>
          </label>
          <label>
            Last Name
            <input type="text" value="<USERS LAST NAME>"></input>
          </label>
          <label>
            Email
            <input type="text" value="<USERS EMAIL NAME>"></input>
          </label>
          <label>
            Password
            <input type="password" value="<USERS PASSWORD>"></input>
          </label>
          <input type="submit" value="Update User Information"></input>
        </fieldset>
      </form>


      <br></br>

      <h2>Location</h2>
      <button onClick={handleLocationSettingsEdit} disabled={userEdit}>Edit Location Settings</button>
      <form onSubmit={handleLocationSettingsUpdate}>
      <fieldset disabled={!locationEdit}>
        <label>
          City
          <input type="text" value="<USERS CITY>"></input>
        </label>
        <label>
          State
          <input type="text" value="<USERS STATE>"></input>
        </label>
        <label>
          Discover Proximity
          <input type="text" value="<USERS DISCOVER PROXIMITY>"></input>
        </label>
        <input type="submit" value="Update Location Settings"></input>
        </fieldset>
      </form>
    </div>
  );
}