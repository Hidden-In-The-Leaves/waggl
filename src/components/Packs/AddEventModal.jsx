import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-modal';
import Axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function AddEventModal({
  closeAddEventPopUp, setShowAddEventPopUp, refresh,
}) {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');

  return (
    <Modal
      isOpen
      style={customStyles}
      contentLabel="Add an event"
    >
      <div>
        <h2>Add an event to the pack calendar</h2>
      </div>
      <div>
        <h3>Event Name</h3>
      </div>
      <div>
        <textarea style={{ width: '100%' }} value={eventName} placeholder="Enter event name here" onChange={(e) => { setEventName(e.currentTarget.value); }} />
      </div>
      <div>
        <h3>Event Description</h3>
      </div>
      <div>
        <input type="text" style={{ width: '100%' }} value={eventDescription} placeholder="Enter you nickname here" onChange={(e) => { setEventDescription(e.currentTarget.value); }} />
      </div>
      <div>
        <h3>Event Start Time</h3>
      </div>
      <div>
        <input type="text" style={{ width: '100%' }} value={eventStart} placeholder="Enter your email address here" onChange={(e) => { setEventStart(e.currentTarget.value); }} />
      </div>
      <div>
        <h3>Event End Time</h3>
      </div>
      <div>
        <input type="text" style={{ width: '100%' }} value={eventEnd} placeholder="Enter your email address here" onChange={(e) => { setEventEnd(e.currentTarget.value); }} />
      </div>
      <div>
        <p>
          <button
            type="button"
            onClick={() => setShowAddEventPopUp(false)}
          >
            Add Event

          </button>
        </p>
      </div>
    </Modal>
  );
}

export default AddEventModal;
