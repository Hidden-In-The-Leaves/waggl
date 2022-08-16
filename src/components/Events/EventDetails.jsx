import React from 'react';
import { Link } from 'react-router-dom';
import Participant from './Participant.jsx';
import EventMessage from './EventMessage.jsx';

export default function EventDetails(props) {
  return (
    <div id="event-details-container">
      <div style={{ width: '100%', height: '200px', background: 'orange' }}>
        Nav Bar Here
        <Link to="/">
          <button>This is a Link to App "Page"!</button>
        </Link>
      </div>
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
            margin: '10px auto',
            display: 'block',
            width: '50%',
            height: '100px',
          }}
        >
          Edit Event
        </button>
        <div
          id="calendar-container"
          style={{
            width: '85%',
            height: '200px',
            borderWidth: '1px',
            borderStyle: 'solid',
            margin: '10px auto',
          }}
        >
          <h2>Location</h2>
        </div>
        <div
          style={{
            width: '85%',
            borderWidth: '1px',
            borderStyle: 'solid',
            margin: '0 auto',
          }}
        >
          <h2>Participants</h2>
          <Participant />
          <Participant />
        </div>
      </div>
      <div style={{ display: 'inline-block', width: '70%', height: '1000px' }}>
        Event Info and post container Here
        <div style={{ height: '250px', background: 'blue' }}>
          Event splash picture here?
        </div>
        <h2>Event Name</h2>
        <p>Some event details, let's do yoga with puppies or something ikd</p>
        <div>
          <div style={{ display: 'inline-block', margin: '20px' }}>
            profile pic here
          </div>
          <input type="textfield" style={{ height: '200px', width: '75%' }} />
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
