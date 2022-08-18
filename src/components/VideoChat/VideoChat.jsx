import React, { useState, useCallback, useEffect, useParams } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Room from './Room';
// useCallback memoizes functions.
// doesn't get redefined everytime this component is rendered/called.

export default function VideoChat({ user = { id: 1, firstName: 'Maria', lastName: 'Hirai' }, packname = 'chihuahua lovers' }) {
  const [token, setToken] = useState(null);
  const getToken = useCallback(async () => {
    const config = {
      method: 'GET',
      url: '/api/video/token',
      params: {
        // id: `${user.id}:${user.firstName} ${user.lastName}`,
        id: `${uuidv4()}: Maria Hirai`,
        packname,
      },
    };
    axios(config)
      .then((result) => {
        setToken(result.data.token);
      })
      .catch((err) => console.log(err));
  }, [user, packname]);

  const exit = useCallback(() => {
    setToken(null);
  }, []);

  useEffect(() => {
    getToken();
    return () => exit();
  }, []);

  if (token) {
    return (
      <div>
        <Room packname={packname} token={token} exit={exit} />
      </div>
    );
  }
  return (
    <div>
      Loading...
    </div>
  );
}
