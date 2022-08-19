import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { useCookies } from 'react-cookie';

import PackBar from './PackBar/PackBar';
import Feed from './Feed/Feed';
import Events from './Events/Events';
import { usePackStore, usePostsStore, useEventsStore } from './Store';
import { useUserStore } from '../Store';
// import { registerCookie, getUserByCookie, removeCookieEntry } from '../../lib/cookie';


export default function HomePage() {
  const resetPacks = usePackStore((state) => state.resetPack);
  const getPosts = usePostsStore((state) => state.getPosts);
  const getEvents = useEventsStore((state) => state.getEvents);
  const userInfo = useUserStore((state) => state.userInfo);

  // const [cookies, setCookie, removeCookie] = useCookies(['session']);
  // upon signin, removeCookie('session');

  useEffect(() => {
    resetPacks(userInfo.id);
    getPosts(userInfo.id);
    getEvents(userInfo.id);

    // TODO: add this function upon successfull signin.
    // (async () => {
    //   if (cookies.session) {
    //     // get userId and store that in state,
    //     const userid = await getUserByCookie(cookies.session);
    //   } else {
    //     const sessionId = await registerCookie(1);
    //     setCookie('session', sessionId);
    //   }
    // })();
  }, [userInfo]);

  return (
    <PageContainer>
      {/* <h1>This is the Home Page!</h1> */}
      <Cols>
        <PackBar />
        <Feed />
        <Events />
      </Cols>
      {/* <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link> */}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  overflow-y: hidden;
  max-height: 100vh;
`;

const Cols = styled.div`
  display: flex;
  flex-direction: row;
`;
