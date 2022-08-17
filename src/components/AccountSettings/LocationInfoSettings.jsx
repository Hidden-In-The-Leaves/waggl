/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LocationInfoSettings() {
  const [locationEdit, setLocationEdit] = useState([]);
  const [city, setCity] = useState({});
  const [userState, setUserState] = useState({});
  const [discoveryRadius, setDiscoveryRadius] = useState({});

  const handleLocationSettingsEdit = () => {
    setLocationEdit(true);
  };

  const setLocationInfo = (data) => {
    setCity(data.city);
    setUserState(data.state);
    setDiscoveryRadius(data.discovery_radius);
  };

  const getLocationInfo = () => {
    const config = {
      method: 'GET',
      url: '/api/accountSettings/locationInfo',
    };

    axios(config)
      .then((res) => {
        setLocationInfo(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleLocationSettingsUpdate = (event) => {
    event.preventDefault();

    // send updated info to server
    const config = {
      method: 'PUT',
      url: '/api/accountSettings/locationInfo',
      data: {
        city,
        state: userState,
        discovery_radius: discoveryRadius,
      },
    };

    axios(config)
      .then(() => {
        getLocationInfo();
        setLocationEdit(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleStateChange = (event) => {
    setUserState(event.target.value);
  };
  const handleDisoveryRadiusChange = (event) => {
    setDiscoveryRadius(event.target.value);
  };

  useEffect(() => {
    if (locationEdit.length === 0) {
      setLocationEdit(false);
    }
    if (typeof city === 'object') {
      getLocationInfo();
    }
  });

  return (
    <div>
      <h2>Location</h2>
      <button type="button" onClick={handleLocationSettingsEdit}>Edit Location Settings</button>
      <form onSubmit={handleLocationSettingsUpdate}>
        <fieldset disabled={!locationEdit}>
          <label>
            City
            <input type="text" value={city} onChange={handleCityChange} />
          </label>
          <label>
            State
            <input type="text" value={userState} onChange={handleStateChange} />
          </label>
          <label>
            Discovery Radius
            <input type="text" value={discoveryRadius} onChange={handleDisoveryRadiusChange} />
          </label>
          <input type="submit" value="Update Location Settings" />
        </fieldset>
      </form>
    </div>
  );
}
