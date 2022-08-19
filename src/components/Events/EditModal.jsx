import React, { useState } from 'react';
import styled from 'styled-components';

export default function EditEvent({event_id, close}) {
  const [eventName, setEventName ] = useState('');
  const [description ,setDescription ] = useState('');
  const [streetAddress1, setStreetAddress1] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [eventPicture, setEventPicture] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <EditModal>
      <div style={{ background: 'white', width: '40%', height:'50%', display:'flex', alignItems: 'center' }}>
        <div>Edit the event name:</div>
        <EditInput onChange={(e) => {setEventName(e.target.value)}} type="text" placeholder="Event Name"></EditInput>
        <div>Edit the event description:</div>
        <EditInput onChange={(e) => {setDescription(e.target.value)}} type="text" placeholder="Description"></EditInput>
        <div>Edit the event address line 1:</div>
        <EditInput onChange={(e) => {setStreetAddress1(e.target.value)}} type="text" placeholder="Street Address 1"></EditInput>
        <div>Edit the event address line 2:</div>
        <EditInput onChange={(e) => {setStreetAddress2(e.target.value)}} type="text" placeholder="Street Address 2"></EditInput>
        <div>Edit the event city:</div>
        <EditInput onChange={(e) => {setCity(e.target.value)}} type="text" placeholder="City"></EditInput>
        <div>Edit the event state:</div>
        <EditInput onChange={(e) => {setState(e.target.value)}} type="text" placeholder="State"></EditInput>
        <div>Edit the event zip code:/</div>
        <EditInput onChange={(e) => {setZipcode(e.target.value)}} type="text" placeholder="Zip Code"></EditInput>
        <div>Edit the event picture URL:</div>
        <EditInput onChange={(e) => {setEventPicture(e.target.value)}} type="text" placeholder="Event Picture URL"></EditInput>
        <div>Edit the event start time:</div>
        <EditInput onChange={(e) => {setStartTime(e.target.value)}} type="text" placeholder="Start Time"></EditInput>
        <div>Edit the event end time:</div>
        <EditInput onChange={(e) => {setEndTime(e.target.value)}} type="text" placeholder="End Time"></EditInput>
        <div>
          <button onClick={() => close(false)} type="button">Close Modal</button>
        </div>
      </div>
    </EditModal>
  );
}

const EditInput = styled.input`
  height: 50px;
  margin: 25px;
  width: 50%;
`;

const EditModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;
