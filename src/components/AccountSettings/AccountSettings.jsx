/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

import UserInfoSettings from './UserInfoSettings';
import LocationInfoSettings from './LocationInfoSettings';
import PrivacySettings from './PrivacySettings';
import { Title } from '../../styledComponents';
import { useUserStore } from '../Store';
import { removeCookieEntry } from '../../lib/cookie';

export default function AccountSettings() {
  const [cookies, setCookie, removeCookie] = useCookies(['session']);

  const [onUserInfo, setOnUserInfo] = useState([]);
  const [onLocationInfo, setOnLocationInfo] = useState([]);
  const [onPrivacySettings, setOnPrivacySettings] = useState([]);

  // ----------------- Zustand States ------------------
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const handleSignOutButton = () => {
    removeCookie('session');
    removeCookieEntry(userInfo.id);
    setUserInfo({});
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
  // console.log(useUserStore);

  if (
    onUserInfo === true || onLocationInfo === true || onPrivacySettings === true
  ) {
    return (
      <div style={{ textAlign: 'center', alignItems: 'center' }}>
        <Title>Account Settings</Title>
        <Link to="/LogIn">
          <Button
            type="button"
            id="signoutButton"
            onClick={handleSignOutButton}
          >
            Sign Out
          </Button>
        </Link>
        <Container>
          <RowButtons>
            <Button
              type="button"
              id="userInfoButton"
              onClick={handleUserInfoButton}
            >
              User Information
            </Button>

            <Button
              type="button"
              id="locationSettingsButton"
              onClick={handleLocationSettingsButton}
            >
              Location Settings
            </Button>

            <Button
              type="button"
              id="privacySettingsButton"
              onClick={handlePrivacySettingsButton}
            >
              Privacy Settings
            </Button>
          </RowButtons>

          {onUserInfo && <UserInfoSettings />}
          {onLocationInfo && <LocationInfoSettings id={userInfo.id} />}
          {onPrivacySettings && <PrivacySettings id={userInfo.id} />}
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  padding: 0 1%;
  border-left: 0.5px solid #d9d9d9;
  border-right: 0.5px solid #d9d9d9;
  box-sizing: border-box;
  height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Button = styled.button`
  color: white;
  background-color: #ff8700;
  border-radius: 30px;
  padding: 3px 10px;
  margin: 5px;
  border-radius: 30px;
  border-color: #ff8700;
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
