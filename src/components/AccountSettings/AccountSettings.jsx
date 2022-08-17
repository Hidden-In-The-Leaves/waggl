/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserInfoSettings from './UserInfoSettings';
import LocationInfoSettings from './LocationInfoSettings';
import PrivacySettings from './PrivacySettings';
import NavBar from '../NavBar/NavBar';
import {
  Title,
} from '../../styledComponents';

export default function AccountSettings() {
  const [onUserInfo, setOnUserInfo] = useState([]);
  const [onLocationInfo, setOnLocationInfo] = useState([]);
  const [onPrivacySettings, setOnPrivacySettings] = useState([]);

  const handleSignOut = () => {
    // SIGN OUT BUTTON
  };

  const handleUserInfoButton = () => {
    setOnUserInfo(true);
    setOnLocationInfo(false);
    setOnPrivacySettings(false);
  };

  const handleLocationSettingsButton = () => {
    setOnUserInfo(false);
    setOnLocationInfo(true);
    setOnPrivacySettings(false);
  };

  const handlePrivacySettingsButton = () => {
    setOnUserInfo(false);
    setOnLocationInfo(false);
    setOnPrivacySettings(true);
  };

  useEffect(() => {
    if (typeof onUserInfo === 'object') {
      setOnUserInfo(true);
      setOnLocationInfo(false);
      setOnPrivacySettings(false);
    }
  });

  if (onUserInfo === true || onLocationInfo === true || onPrivacySettings === true) {
    return (
      <div style={{ textAlign: 'center', alignItems: 'center' }}>
        <NavBar type="home" />
        <Title>Account Settings</Title>
        <Link to="/">
          <Button type="button">This is a Link to App Page!</Button>
        </Link>
        <Container>
          <RowButtons>
            {onUserInfo ? <Button type="button" id="userInfoButton" className="settingsMenuButtonHighlighted" onClick={handleUserInfoButton}>User Information</Button> : <Button type="button" id="userInfoButton" className="settingsMenuButton" onClick={handleUserInfoButton}>User Information</Button>}

            {onLocationInfo ? <Button type="button" id="locationSettingsButton" className="settingsMenuButtonHighlighted" onClick={handleLocationSettingsButton}>Location Settings</Button> : <Button type="button" id="locationSettingsButton" className="settingsMenuButton" onClick={handleLocationSettingsButton}>Location Settings</Button>}

            {onPrivacySettings ? <Button type="button" id="privacySettingsButton" className="settingsMenuButtonHighlighted" onClick={handlePrivacySettingsButton}>Privacy Settings</Button> : <Button type="button" id="privacySettingsButton" className="settingsMenuButton" onClick={handlePrivacySettingsButton}>Privacy Settings</Button>}

            <Button type="button" id="signoutButton" onClick={handleSignOut}>Sign Out</Button>
          </RowButtons>

          {onUserInfo && <UserInfoSettings />}
          {onLocationInfo && <LocationInfoSettings />}
          {onPrivacySettings && <PrivacySettings />}

        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  padding: 0 1%;
  border-left: 0.5px solid #D9D9D9;
  border-right: 0.5px solid #D9D9D9;
  box-sizing: border-box;
  height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const RowButtons = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;
