import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PrivacySettings(props) {
  const [privacySettingsEdit, setPrivacySettingsEdit] = ({});
  const [locationSharing, setLocationSharing] = useState({});
  const [packVisibility, setPackVisibility] = useState({});

  handlePrivacySettingsEdit = () => {
    setPrivacySettingsEdit(true);
  };

  handleLocationSharingOn = () => {
    setLocationSharing(true);
  };

  handleLocationSharingOff = () => {
    setLocationSharing(false);
  };

  handlePackVisibilityOn = () => {
    setPackVisibility(true);
  };

  handlePackVisibilityOff = () => {
    setPackVisibility(false);
  };

  handlePrivacySettingsUpdate = (event) => {
    event.preventDefault();

    const config = {
      method: 'PUT',
      url: 'accountSettings/privacySettings',
      data: {
        locationSharing: locationSharing,
        packVisibility: packVisibility,
      },
    };

    axios(config)
    .then(() => {
      getPrivacySettings();
      setPrivacySettingsEdit(false);
    })
    .catch(err => console.log(err))
  };

  getPrivacySettings = () => {
    const config = {
      method: 'GET',
      url: 'accountSettings/privacySettings'
    };

    axios(config)
      .then((res) => {
        setPrivacySettings(res.data)
      })
      .catch(err => console.log(err));
  };

  setPrivacySettings = (data) => { };

  useEffect(() => {
    if (typeof privacySettingsEdit === 'object') {
      setPrivacySettingsEdit(false);
      getPrivacySettings();
    }
  });

  return (
    <div>
      <h2>Privacy Settings</h2>
      <button onClick={handlePrivacySettingsEdit}>Edit Privacy Settings</button>

      <form onSubmit={handlePrivacySettingsUpdate}>
        <fieldset disabled={!privacySettingsEdit}></fieldset>
        <label>Location Sharing
          <input type="radio" value="On" name="locationSharing" onClick={handleLocationSharingOn}></input>
          <input type="radio" value="Off" name="locationSharing" onClick={handleLocationSharingOff}></input>
        </label>
        <label>Pack Visibility
          <input type="radio" value="On" name="packVisibility" onClick={handlePackVisibilityOn}></input>
          <input type="radio" value="On" name="packVisibility" onClick={handlePackVisibilityOff}></input>
        </label>
      </form>

    </div>
  );
}