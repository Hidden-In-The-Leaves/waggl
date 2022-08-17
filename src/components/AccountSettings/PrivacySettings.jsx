/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PrivacySettings() {
  const [privacySettingsEdit, setPrivacySettingsEdit] = useState([]);
  const [locationSharing, setLocationSharing] = useState([]);
  const [packVisibility, setPackVisibility] = useState([]);

  const handlePrivacySettingsEdit = () => {
    setPrivacySettingsEdit(true);
  };

  const handleLocationSharingOn = () => {
    setLocationSharing(true);
  };

  const handleLocationSharingOff = () => {
    setLocationSharing(false);
  };

  const handlePackVisibilityOn = () => {
    setPackVisibility(true);
  };

  const handlePackVisibilityOff = () => {
    setPackVisibility(false);
  };

  const setPrivacySettings = (data) => {
    setLocationSharing(data.location_sharing);
    setPackVisibility(data.pack_visibility);
  };

  const getPrivacySettings = () => {
    const config = {
      method: 'GET',
      url: '/api/accountSettings/privacySettings',
    };

    axios(config)
      .then((res) => {
        console.log(res.data);
        setPrivacySettings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePrivacySettingsUpdate = (event) => {
    event.preventDefault();

    const config = {
      method: 'PUT',
      url: '/api/accountSettings/privacySettings',
      data: {
        location_sharing: locationSharing,
        pack_visibility: packVisibility,
      },
    };

    axios(config)
      .then(() => {
        getPrivacySettings();
        setPrivacySettingsEdit(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (typeof privacySettingsEdit === 'object') {
      setPrivacySettingsEdit(false);
      getPrivacySettings();
    }
  });

  return (
    <div>
      <h2>Privacy Settings</h2>
      <button type="button" onClick={handlePrivacySettingsEdit}>Edit Privacy Settings</button>

      <form onSubmit={handlePrivacySettingsUpdate}>
        <fieldset disabled={!privacySettingsEdit}>
          <label>
            Location Sharing
            <input type="radio" value="On" name="locationSharing" onClick={handleLocationSharingOn} />
            <input type="radio" value="Off" name="locationSharing" onClick={handleLocationSharingOff} />
          </label>
          <label>
            Pack Visibility
            <input type="radio" value="On" name="packVisibility" onClick={handlePackVisibilityOn} />
            <input type="radio" value="Off" name="packVisibility" onClick={handlePackVisibilityOff} />
          </label>
        </fieldset>
      </form>

    </div>
  );
}
