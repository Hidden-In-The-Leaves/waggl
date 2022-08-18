/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function Participant({ participant, type }) {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) => Array.from(trackMap.values())
    .map((publication) => publication.track)
    .filter((track) => track !== null);

  useEffect(() => {
    const trackSubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((prev) => [...prev, track]);
      } else {
        setAudioTracks((prev) => [...prev, track]);
      }
    };
    const trackUnsubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((prev) => prev.filter((v) => v !== track));
      } else {
        setAudioTracks((prev) => prev.filter((a) => a !== track));
      }
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <Container type={type}>
      <VideoDisplay ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true} />
      <DisplayName>{participant.identity.split(':')[1]}{type && <span style={{fontSize: '15px'}}> (You)</span>}</DisplayName>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.type === 'self' ? '270px' : '230px'};
  height: ${props => props.type === 'self' ? '210px' : '180px'};
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  align-items: center;
  margin: 1%;
  overflow: hidden;
  @media (max-width: 768px) {
    width: ${props => props.type === 'self' ? '200px' : '170px'};
    height: ${props => props.type === 'self' ? '156px' : '132px'};
  }
  @media (max-height: 550px) {
    width: ${props => props.type === 'self' ? '200px' : '170px'};
    height: ${props => props.type === 'self' ? '156px' : '132px'};
  }
`;

const VideoDisplay = styled.video`
  height: 75%;
  width: 100%;
  object-fit: cover;
`;

const DisplayName = styled.div`
  margin: auto;
  font-size: 20px;
  font-weight: 800;
  padding: 10px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-height: 550px) {
    font-size: 16px;
  }
`;