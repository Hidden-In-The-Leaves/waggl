import React, { useState, useEffect } from 'react';
import { SubTitle } from './Chat.styled';
import axios from 'axios';
import {
  CircleImage,
  Members,
  MemberName,
  MemberLocation,
} from '../../Packs/Packs.styled';
import {
  MatchContainer,
  MatchListContainer,
  Match,
  Name,
  DeleteIcon,
} from './MatchList.styled';

export default function MatchList({ user, updateReceiver, updateList }) {
  const [matchList, setMatchList] = useState([]);
  const [selected, setSelected] = useState({});
  useEffect(() => {
    getMatchList();
  }, [user.id, updateList]);
  const getMatchList = () => {
    axios
      .get(`http://localhost:5000/api/test/like?userid=${user.id}`)
      .then(({ data }) => setMatchList(data))
      .catch((err) => console.log(err));
  };
  const clickHandler = (data) => {
    setSelected(data);
    updateReceiver(data);
  };
  const deleteMatch = (data) => {
    if (confirm(`Are you sure want to delete ${data.owner}`) === true) {
      const config = {
        from_id: user.id,
        to_id: data.id,
      };
      axios
        .post(`http://localhost:5000/api/test/match`, config)
        .then(() => getMatchList())
        .catch((err) => console.log(err));
    }
  };
  return (
    <MatchContainer>
      <SubTitle>Match List</SubTitle>
      {matchList.length !== 0 &&
        matchList.map((match) => (
          <MatchListContainer
            key={match.id}
            style={{
              backgroundColor: selected.id === match.id && 'lightgrey',
            }}
          >
            <CircleImage
              src={match.image}
              onClick={() => clickHandler(match)}
            ></CircleImage>
            <Match>
              <Name onClick={() => clickHandler(match)}>{match.owner}</Name>
              <DeleteIcon
                className="fa-solid fa-circle-xmark"
                onClick={() => deleteMatch(match)}
              />
            </Match>
          </MatchListContainer>
        ))}
    </MatchContainer>
  );
}
