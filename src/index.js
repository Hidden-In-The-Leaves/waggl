/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './main.css';

/* import App from './App';
import LogIn from './components/LandingPage/LogIn/LogIn';
import SignUp from './components/LandingPage/SignUp/SignUp';
import HomePage from './components/HomePage/HomePage';
import PackDetails from './components/Packs/PackDetails';
import PackGroupChat from './components/Packs/PackGroupChat';
import EventDetails from './components/Events/EventDetails';
import DiscoverMain from './components/Discover/DiscoverMain/DiscoverMain';
import DiscoverChat from './components/Discover/DiscoverChat/DiscoverChat';
import ProfileList from './components/Profiles/ProfileList';
import Profile from './components/Profiles/Profile';
import ProfileSettings from './components/ProfileSettings/ProfileSettings'; */
import AccountSettings from './components/AccountSettings/AccountSettings';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  // The whole App is wrapped in a browser router component
  // which holds all of the "routes" which are basically endpoints
  <BrowserRouter>
    <Routes>
      {/* to create a route you use a Route component
      and set the "endpoint" name with the attribute "path"
      and point it to a component acting as a page with the element attribute
       */}
      {/* <Route path="/" element={<App />} />
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
      {/*
      <Route path="/:userid/Profile" element={<Profile />} />
      <Route path="/:userid/ProfileSettings" element={<ProfileSettings />} /> */ }
      <Route path="/" element={<AccountSettings />} />
    </Routes>
  </BrowserRouter>,
);
