import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LocationInfoSettings(props) {

  const [locationEdit, setLocationEdit] = useState([]);
  const [city, setCity] = useState({});
  const [userState, setUserState] = useState({});
  const [discoveryRadius, setDiscoveryRadius] = useState({});

  const testData = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'jdoe@gmail.com',
    password: 'mypassword',
    city: 'Chicago',
    state: 'Illinois',
    discovery_radius: '5 miles'
  }

  handleLocationSettingsEdit = (event) => {
    setLocationEdit(true);
  };

  handleLocationSettingsUpdate = (event) => {
    event.preventDefault();

    // send updated info to server
    const config = {
      method: 'PUT',
      url: '/accountSettings/locationInfo',
      data: {
       city: city,
        state: userState,
        discovery_radius: discoveryRadius,
      }
    }

    axios(config)
      .then(() => {
        getLocationInfo();
      })
      .catch(err => console.log(err));

    setLocationEdit(false);
  };

  handleCityChange = (event) => {
    setCity(event.target.value);
  };
  handleStateChange = (event) => {
    setState(event.target.value);
  };
  handleDisoveryRadiusChange = (event) => {
    setDiscoveryRadius(event.target.value);
  };

  getLocationInfo = () => {
    const config = {
      method: 'GET',
      url: '/accountSettings/locationInfo'
    }

    axios(config)
    .then(res => {
      setLocationInfo(res.data)
    })
    .catch(err => console.log(err));
  };

  setLocationInfo = (data) => {
    setCity(data.city);
    setUserState(data.state);
    setDiscoveryRadius(data.discovery_radius);
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
      <button onClick={handleLocationSettingsEdit}>Edit Location Settings</button>
      <form onSubmit={handleLocationSettingsUpdate}>
        <fieldset disabled={!locationEdit}>
          <label>
            City
            <input type="text" value={city}></input>
          </label>
          <label>
            State
            <input type="text" value={state}></input>
          </label>
          <label>
            Discovery Radius
            <input type="text" value={discoveryRadius}></input>
          </label>
          <input type="submit" value="Update Location Settings"></input>
        </fieldset>
      </form>
    </div>
  );
};