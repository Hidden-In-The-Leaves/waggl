import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import styled from 'styled-components';
import Participant from './Participant';


export default function Room({ packname, token, exit }) {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const closeConnection = async () => {
    await setRoom((currentRoom) => {
      if (currentRoom && currentRoom.localParticipant.state === 'connected') {
        currentRoom.localParticipant.tracks.forEach((trackPublication) => {
          trackPublication.track.stop();
          const attachedElements = trackPublication.track.detach();
          attachedElements.forEach(element => element.remove());
        });
        currentRoom.disconnect();
        return null;
      }
      return currentRoom;
    });
    exit();
  };

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prev) => [...prev, participant]);
    };
    const participantDisconnected = (participant) => {
      setParticipants((prev) => prev.filter((p) => p.identity !== participant.identity));
      console.log('someone disconnected');
    };

    Video.connect(token, {
      name: packname,
    })
      .then((returnedRoom) => {
        setRoom(returnedRoom);
        returnedRoom.on('participantConnected', participantConnected);
        returnedRoom.on('participantDisconnected', participantDisconnected);
        returnedRoom.participants.forEach(participantConnected);

        const tidyUp = (r) => (
          (event) => {
            if (event.persisted) {
              return;
            }
            if (r) {
              r.disconnect();
              r = null;
            }
          }
        );

        window.addEventListener('beforeunload', tidyUp(returnedRoom));
        window.addEventListener('pagehide', tidyUp(returnedRoom));
      })
      .catch((err) => console.log('error connecting video', err));

    // when component is dismounted, disconnect from video
    return () => {
      closeConnection();
    };
  }, [packname, token]);

  return (
    <div>
      <h2>packname: {packname}</h2>
      <button type="button" onClick={closeConnection}>exit</button>
      <div>
        {room && (
          <Participant participant={room.localParticipant}/>
        )}
      </div>
      <div>
        participants
        {room && (
          participants.map((p) => <Participant key={p.identity} participant={p} />)
        )}
      </div>
    </div>
  );
}

