import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Participant from './Participant';
import EventMessage from './EventMessage';
import NavBar from '../NavBar/NavBar';
import EditModal from './EditModal';
import MapContainer from './Map';

export default function EventDetails(props) {
  const [currentUser, setCurrentUser] = useState(1);
  const [currentPack, setCurrentPack] = useState(3);
  const [currentEvent, setCurrentEvent] = useState(6);
  const [eventInfo, setEventInfo] = useState({});
  const [attendees, setAttendees] = useState([]);
  const [packInfo, setPackInfo] = useState({});
  const [eventMessages, setEventMessages] = useState([]);
  const [currentUserPic, setCurrentUserPic] = useState('https://media.istockphoto.com/photos/its-a-paddle-board-time-picture-id1327654972');
  const [eventPic, setEventPic] = useState(
    'https://media.istockphoto.com/photos/labradoodle-dog-ordering-online-by-internet-for-home-delivery-picture-id1365754761',
  );
  const [textInput, setTextInput] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const getEventMessages = async (event_id) => {
    try {
      const config = {
        method: 'GET',
        url: '/api/events/messages',
        params: { event_id },
      };
      const response = await axios(config);
      setEventMessages(response.data);
    } catch (err) {
      console.log('error getting event messages', err);
    }
  };

  const makeEventPost = async () => {
    try {
      const config = {
        method: 'POST',
        url: '/api/events/messages',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          event_id: currentEvent,
          text: textInput,
          poster_id: currentUser,
          pack_id: currentPack,
        },
      };
      const response = await axios(config);
      console.log(response);
      getEventMessages(currentEvent);
    } catch (err) {
      console.log('error posting event message', err);
    }
  };

  const getPackInfo = async (pack_id) => {
    try {
      const config = {
        method: 'GET',
        url: '/api/packs/pack',
        params: { pack_id },
      };
      const response = await axios(config);
      setPackInfo(response.data[0]);
    } catch (e) {
      console.log('error getting pack name', e);
    }
  };

  const getEventInfo = async (event_id) => {
    try {
      const config = {
        method: 'GET',
        url: '/api/events/event',
        params: { event_id },
      };
      const response = await axios(config);
      setEventInfo(response.data[0]);
      getPackInfo(response.data[0].pack_id);
    } catch (e) {
      console.log('error getting events', e);
    }
  };

  const getAttendees = async (event_id) => {
    try {
      const config = {
        method: 'GET',
        url: '/api/events/attendees',
        params: { event_id },
      };
      const response = await axios(config);
      setAttendees(response.data);
    } catch (e) {
      console.log('error getting attendees', e);
    }
  };

  const editModal = (showEditModal ? <EditModal event_id={currentEvent} close={setShowEditModal}/> : null);

  useEffect(() => {
    getEventInfo(currentEvent);
    getAttendees(currentEvent);
    getEventMessages(currentEvent);
  }, []);

  return (
    <div id="event-details-container">
      {editModal}
      <div
        style={{
          display: 'inline-block',
          width: '30%',
          height: '100%',
          verticalAlign: 'top',
          // textAlign:'center'
        }}
      >
        <EditButton
          type="button"
          onClick={() => setShowEditModal(true)}
        >
          Edit Event
        </EditButton>
        <h2 style={{ marginLeft: '20px' }}>{`${eventInfo.street_address1} ${eventInfo.city} ${eventInfo.state}`}</h2>
        <div style={{ margin: 'auto' }} id="map">
          {eventInfo.city ? <MapContainer address={`${eventInfo.street_address1}, ${eventInfo.city}`} /> : null}
        </div>
        <div
          style={{
            width: '85%',
            margin: '20px auto',
          }}
        >
          <h2>Participants</h2>
          {attendees.map((attendee) =>
            <Participant user_id={attendee.user_id} key={attendee.user_id} />)}
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
            src={eventPic}
            alt="profile pic for event"
          />
        </div>
        <div style={{ marginLeft: '20px' }} id="event-info">
          <h2>{eventInfo.event_name}</h2>
          <h3>
            Hosted by:
            {` ${ packInfo.pack_name}`}
          </h3>
          <p>{eventInfo.description}</p>
        </div>
        <div>
          <RoundImg src={currentUserPic} />
          <input
            onChange={(e) => setTextInput(e.target.value)}
            type="textfield"
            style={{
              fontSize: '40px',
              height: '200px',
              width: '75%',
              border: '1px solid #9F9F9F',
              borderRadius: '10px',
              margin: '15px 20px',
            }}
          />
          <button type="button"
            onClick={() => {
              makeEventPost();
            }}
          >
            Make Post
          </button>
          <input type="file" />
        </div>
        <h1 style={{ marginLeft: '50px' }}> Event Posts!</h1>
        <div
          style={{
            background: 'orange', marginTop: '20px', height: '100%', borderRadius: '10px', overflowY: 'auto',
          }}
        >
          {eventMessages.map((message) => <EventMessage key={message.id} message={message} />)}
        </div>
      </div>
    </div>
  );
}

const RoundImg = styled.img`
  display: inline-block;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 15px;
`;

const EditButton = styled.button`
  margin: auto;
  margin-top: 20px;
  height: 50px;
  width: 250px;
  font-size: 25px;
  display: block;
  color: white;
  background-color: #FF8700;
  border-radius: 40px;
  padding: 3px 10px;
  border-radius: 30px;
  border-color: #FF8700;
  border-style: solid;
  &:hover: {
    opacity: 60%,
    cursor: pointer;
`;
