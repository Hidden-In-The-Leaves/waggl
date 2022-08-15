import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LocationInfoSettings(props) {

  const [locationEdit, setLocationEdit] = useState([]);
  const [city, setCity] = useState({});
  const [state, setState] = useState({});
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

  getLocationInfo = () => { };
  setLocationInfo = () => { };

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