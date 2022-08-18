/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  InputLabel, SectionTitle, Input,
} from '../../styledComponents';

export default function LocationInfoSettings() {
  const [locationEdit, setLocationEdit] = useState([]);
  const [city, setCity] = useState({});
  const [userState, setUserState] = useState({});
  const [discoveryRadius, setDiscoveryRadius] = useState({});

  const handleLocationSettingsEdit = () => {
    setLocationEdit(true);
  };

  const setLocationInfo = (data) => {
    if (data[0].city === undefined) {
      setCity('');
    } else {
      setCity(data[0].city);
    }
    if (data[0].state === undefined) {
      setUserState('');
    } else {
      setUserState(data[0].state);
    }
    if (data[1] === null) {
      setDiscoveryRadius('');
    } else {
      setDiscoveryRadius(data[1].discovery_radius);
    }
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
    <div style={{ minWidth: 500 }}>
      <SectionTitle>Location</SectionTitle>
      <Button type="button" onClick={handleLocationSettingsEdit}>Edit Location Settings</Button>
      <br />
      <form style={{ margin: 50 }} onSubmit={handleLocationSettingsUpdate}>
        <fieldset disabled={!locationEdit}>
          <InputLabel>
            City
            <Input type="text" value={city} onChange={handleCityChange} />
          </InputLabel>
          <InputLabel>
            State
            <Input type="text" value={userState} onChange={handleStateChange} />
          </InputLabel>
          <InputLabel>
            Discovery Radius
            <Input type="text" value={discoveryRadius} onChange={handleDisoveryRadiusChange} />
          </InputLabel>
          <Button type="submit">Update Location Settings</Button>
        </fieldset>
      </form>
    </div>
  );
}

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
