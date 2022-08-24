import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { CookiesProvider, useCookies } from 'react-cookie';
import axios from 'axios';
import './main.css';
import { registerCookie, getUserByCookie, removeCookieEntry } from './lib/cookie';
import { useUserStore } from './components/Store';

import NavBar from './components/NavBar/NavBar';
const App = lazy(() => import('./App.jsx'));
const LogIn = lazy(() => import('./components/LandingPage/LogIn/LogIn.jsx'));
const SignUp = lazy(() => import('./components/LandingPage/SignUp/SignUp.jsx'));
const HomePage = lazy(() => import('./components/HomePage/HomePage.jsx'));
const PackDetails = lazy(() => import('./components/Packs/PackDetails.jsx'));
const PackGroupChat = lazy(() =>
  import('./components/Packs/PackGroupChat.jsx')
);
const EventDetails = lazy(() => import('./components/Events/EventDetails.jsx'));
const DiscoverMain = lazy(() =>
  import('./components/Discover/DiscoverMain.jsx')
);
// const DiscoverChat = lazy(() =>
//   import('./components/Discover/DiscoverChat/Chat.jsx')
// );
const ProfileList = lazy(() => import('./components/Profiles/ProfileList.jsx'));
const Profile = lazy(() => import('./components/Profiles/Profile.jsx'));
const ProfileSettings = lazy(() =>
  import('./components/ProfileSettings/ProfileSettings.jsx')
);
const AccountSettings = lazy(() =>
  import('./components/AccountSettings/AccountSettings.jsx')
);
const AboutUs = lazy(() => import('./components/AboutUs/AboutUs.jsx'));
const PackVideoChat = lazy(() => import('./components/VideoChat/VideoChat.jsx'));

const container = document.getElementById('root');
const root = createRoot(container);

function Index() {
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [cookies, setCookie, removeCookie] = useCookies(['session']);

  const setZustandUser = ({ id, first_name, last_name, email, profile_pic_url }) => {
    const user = {
      id: id,
      firstName: first_name,
      lastName: last_name,
      email: email,
      profile_pic_url
    };
    setUserInfo(user);
  };

  useEffect(() => {
    (async () => {
      if (cookies.session) {
        // get userId and store that in state,
        const userid = await getUserByCookie(cookies.session);
        axios.get(`/api/user/${userid}`)
          .then((result) => {
            setZustandUser(result.data[0])
          })
          .catch((err) => console.log('error getting userinfo cookies', err));
      }
    })();

    // // TODO: add this function upon successful signout
    // (async () => {
    //   removeCookie('session');
    //   removeCookieEntry(userid);
    // })();
  }, []);

  return (
    //The whole App is wrapped in a browser router component
    //which holds all of the "routes" which are basically endpoints
    <BrowserRouter>
      <CookiesProvider>
      <NavBar />
      {/* for react routers code splitting */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* to create a route you use a Route component
        and set the "endpoint" name with the attribute "path"
        and point it to a component acting as a page with the element attribute
        */}
          <Route path="/" element={<App />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/PackDetails/:packid" element={<PackDetails />} />
          <Route path="/PackGroupChat/:packid" element={<PackGroupChat />} />
          {/* <Route path="/" element={<PackGroupChat />} /> */}
          <Route path="/EventDetails/:eventid" element={<EventDetails />} />
          {/* <Route path="/" element={<DiscoverMain />} /> */}
          <Route path="/DiscoverMain" element={<DiscoverMain />} exact />
          <Route path="/DiscoverMain/:chat" element={<DiscoverMain />} exact />
          <Route path="/ProfileList/:userid" element={<ProfileList />} />
          {/* We can use parameters in react router to go to individual profiles */}
          <Route path="/Profile/:dogid" element={<Profile />} />
          <Route path="/ProfileSettings/:userid" element={<ProfileSettings />} />
          <Route path="/AccountSettings/:userid" element={<AccountSettings />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/PackVideoChat/:packid" element={<PackVideoChat />} />
        </Routes>
      </Suspense>
      </CookiesProvider>
    </BrowserRouter>
  );
}


root.render(
  <Index />
);
