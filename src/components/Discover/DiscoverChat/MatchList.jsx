import React, { useState, useEffect } from 'react';
import { SubTitle } from './Chat.styled';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  CircleImage,
  Members,
  MemberName,
  MemberLocation,
} from '../../Packs/Packs.styled';

export default function MatchList() {
  const [matchList, setMatchList] = useState([]);
  const userid = 1;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/test/like?userid=${userid}`)
      .then(({ data }) => setMatchList(data))
      .catch((err) => console.log(err));
  }, [userid]);
  return (
    <div
      style={{
        width: '35%',
        borderRight: '2px red solid',
        height: '80vh',
        overflow: 'hidden',
      }}
    >
      <SubTitle>Match List</SubTitle>
      {matchList.length !== 0 &&
        matchList.map((match) => (
          <Members key={match.id}>
            <CircleImage src={match.image}></CircleImage>
            <div>
              <MemberName>{match.owner}</MemberName>
            </div>
          </Members>
        ))}
    </div>
  );
}
