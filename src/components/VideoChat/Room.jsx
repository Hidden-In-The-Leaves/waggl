import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import styled from 'styled-components';
import Participant from './Participant';

export default function Room({ pack, token }) {
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
    };

    if (token) {
      Video.connect(token, {
        name: pack.name,
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
    }

    // when component is dismounted, disconnect from video
    return () => {
      closeConnection();
    };
  }, [token]);

  return (
    <Container>
      {token && (
        <>
        <div style={{ fontSize: '20px', padding: '20px', textAlign: 'center', fontWeight: 'bold' }}>Video Chat</div>
          <ParticipantsContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flex: '1 0 21%' }}>
              {room && (
                <>
                  <Participant participant={room.localParticipant} type="self" />
                  {participants.map((p) => <Participant key={p.identity} participant={p} />)}
                </>
              )}
            </div>
          </ParticipantsContainer>
        </>
      )}
      {!token && (
        <Ended>
          Ended Video Call
        </Ended>
      )}
    </Container>
  );
}

const Ended = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 28px;
  font-weight: bold;
`;
const ParticipantsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 60vh;
`;

const Container = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column; */
`;