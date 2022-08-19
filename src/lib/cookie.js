import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export async function registerCookie(userId) {
  const sessionId = uuidv4();
  const config = {
    method: 'POST',
    url: '/api/session',
    data: {
      session_id: sessionId,
      user_id: userId,
    },
  };
  try {
    await axios(config);
    return sessionId;
    // once returned, set sessionId to cookie.
  } catch (e) {
    console.log('error registering cookie to database', e);
    return new Error('error registering cookie to database', e);
  }
}

export async function getUserByCookie(sessionId) {
  const config = {
    method: 'GET',
    url: '/api/session',
    params: {
      session_id: sessionId,
    },
  };
  try {
    const result = await axios(config);
    return result.data[0].user_id;
  } catch (e) {
    console.log('error getting cookie from database', e);
    return new Error('error getting cookie from database', e);
  }
}

export async function removeCookieEntry(userId) {
  const config = {
    method: 'DELETE',
    url: '/api/session',
    params: { user_id: userId },
  };
  axios(config)
    .catch((err) => console.log('error deleting cookie from database', err));
}
