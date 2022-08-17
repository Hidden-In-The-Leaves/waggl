import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import "./main.css";

const App = lazy(() => import('./App.jsx'));
const LogIn = lazy(() => import('./components/LandingPage/LogIn/LogIn.jsx'));
const SignUp = lazy(() => import('./components/LandingPage/SignUp/SignUp.jsx'));
const HomePage = lazy(() => import('./components/HomePage/HomePage.jsx'));
const PackDetails = lazy(() => import('./components/Packs/PackDetails.jsx'));
const PackGroupChat = lazy(() => import('./components/Packs/PackDetails.jsx'));
const EventDetails = lazy(() => import('./components/Events/EventDetails.jsx'));
const DiscoverMain = lazy(() => import('./components/Discover/DiscoverMain/DiscoverMain.jsx'));
const DiscoverChat = lazy(() => import('./components/Discover/DiscoverChat/DiscoverChat.jsx'));
const ProfileList = lazy(() => import('./components/Profiles/ProfileList.jsx'));
const Profile = lazy(() => import('./components/Profiles/Profile.jsx'));
const ProfileSettings = lazy(() => import('./components/ProfileSettings/ProfileSettings.jsx'));
const AccountSettings = last(() => import('./components/AccountSettings/AccountSettings.jsx'));
const AboutUs = lazy(() => import('./components/AboutUs/AboutUs.jsx'));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  //The whole App is wrapped in a browser router component
  //which holds all of the "routes" which are basically endpoints
  <BrowserRouter>
    {/* for react routers code splitting */}
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* to create a route you use a Route component
      and set the "endpoint" name with the attribute "path"
      and point it to a component acting as a page with the element attribute
       */}
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<App />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/:packid/PackDetails" element={<PackDetails />} />
        <Route path="/:chatid/PackGroupChat" element={<PackGroupChat />} />
        <Route path="/:eventid/EventDetails" element={<EventDetails />} />
        <Route path="/DiscoverMain" element={<DiscoverMain />} />
        <Route path="/:chatid/DiscoverChat" element={<DiscoverChat />} />
        <Route path="/:userid/ProfileList" element={<ProfileList />} />
        {/* We can use parameters in react router to go to individual profiles */}
        <Route path="/:userid/Profile" element={<Profile />} />
        <Route path="/:userid/ProfileSettings" element={<ProfileSettings />} />
        <Route path="/:userid/AccountSettings" element={<AccountSettings />} />
        <Route path="/AboutUs" element={<AboutUs />} />

      </Routes>
    </Suspense>
  </BrowserRouter >
)