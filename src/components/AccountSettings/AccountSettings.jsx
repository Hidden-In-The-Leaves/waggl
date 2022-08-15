import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserInfoSettings from './UserInfoSettings';
import LocationInfoSettings from './LocationInfoSettings';
import PrivacySettings from './PrivacySettings';

export default function AccountSettings(props) {
  const [onUserInfo, setOnUserInfo] = ({});
  const [onLocationInfo, setOnLocationInfo] = ({});
  const [onPrivacySettings, setOnPrivacySettings] = ({});

  handleUserInfoButton = () => {
    setOnUserInfo(true);
    setOnLocationInfo(false);
    setOnPrivacySettings(false);
  };

  handleLocationSettingsButton = () => {
    setOnUserInfo(false);
    setOnLocationInfo(true);
    setOnPrivacySettings(false);
  };

  handlePrivacySettingsButton = () => {
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

  return (
    <div>

      <h1>This is the Account Settings!</h1>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>

      <div className="1/3left">

        {onUserInfo ? <button id="userInfoButton" className="settingsMenuButtonHighlighted" onClick={handleUserInfoButton}>User Information</button> : <button id="userInfoButton" className="settingsMenuButton" onClick={handleUserInfoButton}>User Information</button>}

        {onLocationInfo ? <button id="locationSettingsButton" className="settingsMenuButtonHighlighted" onClick={handleLocationSettingsButton}>Location Settings</button> : <button id="locationSettingsButton" className="settingsMenuButton" onClick={handleLocationSettingsButton}>Location Settings</button>}

        {onPrivacySettings ? <button id="privacySettingsButton" className="settingsMenuButtonHighlighted" onClick={handlePrivacySettingsButton}>Privacy Settings</button> : <button id="privacySettingsButton" className="settingsMenuButton" onClick={handlePrivacySettingsButton}>Privacy Settings</button>}

      </div>

      <div className="2/3right">

        {onUserInfo && <UserInfoSettings />}
        {onLocationInfo && <LocationInfoSettings />}
        {onPrivacySettings && <PrivacySettings />}

      </div>
    </div>
  )
};