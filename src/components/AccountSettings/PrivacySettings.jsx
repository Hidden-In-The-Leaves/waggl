/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useUserStore } from '../Store';
import {
  InputLabel, SectionTitle, Input,
} from '../../styledComponents';

export default function PrivacySettings() {
  const [privacySettingsEdit, setPrivacySettingsEdit] = useState([]);
  const [locationSharing, setLocationSharing] = useState([]);
  const [packVisibility, setPackVisibility] = useState([]);

  const userInfo = useUserStore((state) => state.userInfo);

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
    if (data.location_sharing === undefined) {
      setLocationSharing(false);
    } else {
      setLocationSharing(data.location_sharing);
    }
    if (data.packs_visible === undefined) {
      setPackVisibility(false);
    } else {
      setPackVisibility(data.packs_visible);
    }
  };

  const getPrivacySettings = () => {
    const config = {
      method: 'GET',
      url: `/api/accountSettings/privacySettings/${userInfo.id}`,
    };

    axios(config)
      .then((res) => {
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
      url: `/api/accountSettings/privacySettings/${userInfo.id}`,
      data: {
        location_sharing: locationSharing,
        packs_visible: packVisibility,
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

  if (typeof locationSharing === 'boolean' && typeof packVisibility === 'boolean') {
    return (
      <div style={{ minWidth: 500 }}>
        <SectionTitle>Privacy Settings</SectionTitle>
        <Button type="button" onClick={handlePrivacySettingsEdit}>Edit Privacy Settings</Button>

        <br />

        <form style={{ margin: 50 }} onSubmit={handlePrivacySettingsUpdate}>
          <fieldset disabled={!privacySettingsEdit}>
            <InputLabel>
              Location Sharing
              <br />
              <InputLabel>
                On
                <Input type="radio" value="On" name="locationSharing" checked={locationSharing === true} onChange={handleLocationSharingOn} />
              </InputLabel>

              <InputLabel>
                Off
                <Input type="radio" value="Off" name="locationSharing" checked={locationSharing === false} onChange={handleLocationSharingOff} />
              </InputLabel>

            </InputLabel>
            <InputLabel>
              Pack Visibility
              <br />
              <InputLabel>
                On
                <Input type="radio" value="On" name="packVisibility" checked={packVisibility === true} onChange={handlePackVisibilityOn} />
              </InputLabel>
              <InputLabel>
                Off
                <Input type="radio" value="Off" name="packVisibility" checked={packVisibility === false} onChange={handlePackVisibilityOff} />
              </InputLabel>
            </InputLabel>
            <Button type="submit">Update Privacy Settings</Button>
          </fieldset>
        </form>

      </div>
    );
  }
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
