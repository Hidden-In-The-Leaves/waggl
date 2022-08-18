import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Participant from './Participant';
import EventMessage from './EventMessage';
import NavBar from '../NavBar/NavBar';
import AddEvent from './AddEvent';
import MapContainer from './Map';

export default function EventDetails(props) {
  const [profilePic, setProfilePic] = useState(
    'https://media.istockphoto.com/photos/labradoodle-dog-ordering-online-by-internet-for-home-delivery-picture-id1365754761'
  );
  return (
    <div id="event-details-container">
      <div style={{ width: '100%', height: '200px' }}>
        <NavBar />
      </div>
      <AddEvent />
      <div
        style={{
          display: 'inline-block',
          width: '30%',
          height: '100%',
          verticalAlign: 'top',
          // textAlign:'center'
        }}
      >
        <button
          style={{
            margin: 'auto',
            marginTop: '20px',
            height: '50px',
            width: '250px',
            fontSize: '25px',
            display: 'block',
            color: 'white',
            backgroundColor: '#FF8700',
            borderRadius: '40px',
            padding: '3px 10px',
            borderRadius: '30px',
            borderColor: '#FF8700',
            borderStyle: 'solid',
            hover: {
              opacity: '60%',
              cursor: 'pointer',
            },
          }}
        >
          Edit Event
        </button>
        <h2 style={{ marginLeft: '20px' }}>Location</h2>
        <div style={{ margin: 'auto' }} id="map">
          <MapContainer />
        </div>
        <div
          style={{
            width: '85%',
            margin: '20px auto',
          }}
        >
          <h2>Participants</h2>
          <Participant />
          <Participant />
        </div>
      </div>
      <div style={{ display: 'inline-block', width: '70%', height: '500px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '250px',
            position: 'relative',
            background: 'orange',
            borderRadius: '10px',
          }}
        >
          <img
            style={{ height: '250px' }}
            src={profilePic}
            alt="profile pic for event"
          />
        </div>
        <h2>Event Name</h2>
        <h3>Pack Name</h3>
        <p>Some event details, let's do yoga with puppies or something ikd</p>
        <div>
          <div style={{ display: 'inline-block', margin: '20px' }}>
            profile pic here
          </div>
          <input
            type="textfield"
            style={{
              height: '200px',
              width: '75%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
              margin: '5px 0 15px 0',
            }}
          />
          <input type="file" />
        </div>
        <div
          style={{ background: 'orange', marginTop: '20px', height: '100%' }}
        >
          Event Messages Here
          <EventMessage />
          <EventMessage />
        </div>
      </div>
    </div>
  );
}
