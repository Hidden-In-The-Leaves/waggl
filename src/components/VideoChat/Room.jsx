import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import styled from 'styled-components';
import Participant from './Participant';
import { Title, Button } from '../../styledComponents';

export default function Room({ pack, token, exit }) {
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

    // when component is dismounted, disconnect from video
    return () => {
      closeConnection();
    };
  }, [pack, token]);

  return (
    <Container>
      <TitleBar>
        <FlexContainer>
          <RoundImg src={pack.url} />
          <FlexColumn>
            <Title>{pack.name}</Title>
            <div style={{ fontSize: '14px' }}>{pack.description}</div>
          </FlexColumn>
        </FlexContainer>
        <Button type="button" onClick={closeConnection}>exit</Button>
      </TitleBar>
      <div style={{ fontSize: '20px', padding: '20px', textAlign: 'center', fontWeight: 'bold' }}>Video Chat</div>
      {/* <SelfContainer>
        {room && (
          <Participant participant={room.localParticipant} type="self" />
        )}
      </SelfContainer>
      <OtherParticipants>
        {room && (
          participants.map((p) => <Participant key={p.identity} participant={p} />)
        )}
      </OtherParticipants> */}
      <ParticipantsContainer>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flex: '1 0 21%' }}>
          {room && (
            <>
              <Participant participant={room.localParticipant} type={true} />
              {participants.map((p) => <Participant key={p.identity} participant={p} />)}
            </>
          )}
        </div>
      </ParticipantsContainer>
    </Container>
  );
}

const FlexContainer = styled.div`
  display: flex;
  box-sizing:border-box;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 5% 0;
`;

const FlexColumn = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 10vh;
  border-bottom: 1px solid #D9D9D9;
`;

const RoundImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 3%;
`;

const SelfContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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