/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserInfoSettings from './UserInfoSettings';
import LocationInfoSettings from './LocationInfoSettings';
import PrivacySettings from './PrivacySettings';
import { Container_1_3, Container_2_3 } from '../../styledComponents';

export default function AccountSettings() {
  const [onUserInfo, setOnUserInfo] = useState([]);
  const [onLocationInfo, setOnLocationInfo] = useState([]);
  const [onPrivacySettings, setOnPrivacySettings] = useState([]);

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
      <div>

        <h1>This is the Account Settings!</h1>
        <Link to="/">
          <button type="button">This is a Link to App Page!</button>
        </Link>

        <Container_1_3>
          <div className="profilePictureUpload">INSERT PROFILE PICTURE UPLOAD</div>

          <div>
            {onUserInfo ? <button type="button" id="userInfoButton" className="settingsMenuButtonHighlighted" onClick={handleUserInfoButton}>User Information</button> : <button type="button" id="userInfoButton" className="settingsMenuButton" onClick={handleUserInfoButton}>User Information</button>}

            {onLocationInfo ? <button type="button" id="locationSettingsButton" className="settingsMenuButtonHighlighted" onClick={handleLocationSettingsButton}>Location Settings</button> : <button type="button" id="locationSettingsButton" className="settingsMenuButton" onClick={handleLocationSettingsButton}>Location Settings</button>}

            {onPrivacySettings ? <button type="button" id="privacySettingsButton" className="settingsMenuButtonHighlighted" onClick={handlePrivacySettingsButton}>Privacy Settings</button> : <button type="button" id="privacySettingsButton" className="settingsMenuButton" onClick={handlePrivacySettingsButton}>Privacy Settings</button>}
          </div>

          <button type="button" id="signoutButton">Sign Out</button>

        </Container_1_3>

        <Container_2_3>

          {onUserInfo && <UserInfoSettings />}
          {onLocationInfo && <LocationInfoSettings />}
          {onPrivacySettings && <PrivacySettings />}

        </Container_2_3>
      </div>
    );
  }
}
