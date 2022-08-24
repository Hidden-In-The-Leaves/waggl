import React, { useState, useEffect } from 'react';
import { SubTitle } from './Chat.styled';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  CircleImage,
  Members,
  MemberName,
  MemberLocation,
} from '../Packs/Packs.styled';
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
  const navigate = useNavigate();

  useEffect(() => {
    getMatchList();
  }, [user.id, updateList]);

  const getMatchList = () => {
    axios
      .get(`/api/test/like?userid=${user.id}`)
      .then(({ data }) => {
        updateReceiver(data[0]);
        setMatchList(data);
      })
      .catch((err) => console.log(err));
  };
  const clickHandler = (data) => {
    setSelected(data);
    updateReceiver(data);
    navigate('/DiscoverMain/1');
  };
  const deleteMatch = (data) => {
    if (confirm(`Are you sure want to delete ${data.owner}`) === true) {
      const config = {
        from_id: user.id,
        to_id: data.id,
      };
      axios
        .post(`/api/test/match`, config)
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
              style={{ objectFit: 'cover' }}
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
      {matchList.length === 0 && (
        <div style={{ textAlign: 'center' }}>
          You don't have any matches, go{' '}
          <Link to="/DiscoverMain">Discover</Link>
        </div>
      )}
    </MatchContainer>
  );
}
