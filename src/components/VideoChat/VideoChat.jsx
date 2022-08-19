import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
import Room from './Room';
import { useUserStore } from '../Store';
// useCallback memoizes functions.
// doesn't get redefined everytime this component is rendered/called.

export default function VideoChat({
  // user = { id: 1, firstName: 'Maria', lastName: 'Hirai' },
  // pack = { name: 'chihuahua lovers', url: "https://images.unsplash.com/photo-1610041518868-f9284e7eecfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"}
}) {
  const [token, setToken] = useState(null);
  const userInfo = useUserStore((state) => state.userInfo);

  // const { packid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const packid = searchParams.get('packid');

  const getToken = useCallback(async () => {
    const config = {
      method: 'GET',
      url: '/api/video/token',
      params: {
        // TODO: should be changed to below after testing phase
        id: `${userInfo.id}:${userInfo.first_name} ${userInfo.last_name}`,
        // id: `${uuidv4()}: Maria Hirai`,
        packname: packid,
      },
    };
    axios(config)
      .then((result) => {
        setToken(result.data.token);
      })
      .catch((err) => console.log(err));
  }, [userInfo]);

  const exit = useCallback(() => {
    setToken(null);
  }, []);

  useEffect(() => {
    if (userInfo.id) {
      getToken();
    }
    return () => exit();
  }, []);

  if (token) {
    return (
      <div style={{ width: '66%', margin: 'auto', paddingBottom: '50px' }}>
        <Room pack={pack} token={token} exit={exit} />
      </div>
    );
  }
  return (
    <Ended>
      Ended Video Call
    </Ended>
  );
}

const Ended = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 28px;
  font-weight: bold;
`;
