import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Title } from './Chat.styled';
import { getDistance, sortBy } from '../../helpers/geoLocation';
import {
  MainContainer,
  LikeContainer,
  LikeIcon,
  SuperLikeIcon,
} from './MainSection.styled';
import DogDetail from './DogDetail';

export default function MainSection({
  lat,
  lng,
  getDefaultMatch,
  updateMatchList,
}) {
  const [matchList, setMatchList] = useState([]);
  const [index, setIndex] = useState(1);
  const [pointer, setPointer] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const currentPosition = {
    lat: lat,
    lng: lng,
  };
  useEffect(() => {
    if (lat && lng) {
      axios
        .get('http://localhost:5000/api/test')
        .then(({ data }) => {
          const list = sortBy(10, currentPosition, getDistance, data);
          getDefaultMatch(list[1]);
          setMatchList(list);
        })
        .catch((err) => console.log(err));
    }
  }, [lat, lng]);
  const clickHandler = (data, like) => {
    const likeData = {
      from_id: matchList[0][1].owner_id,
      to_id: data.id,
      like_level: like,
    };
    axios
      .post(`http://localhost:5000/api/test/like`, likeData)
      .then(() => {
        setIndex(index + 1 === matchList.length ? index : index + 1);
        setPointer(pointer + 1);
        setImageIndex(0);
        updateMatchList();
      })
      .catch((err) => console.log(err));
  };
  return (
    <MainContainer>
      <Title>Discover</Title>
      {matchList.length === 1 && (
        <p style={{ textAlign: 'center' }}>No dog found within the range</p>
      )}
      {matchList.length > 1 && (
        <p style={{ textAlign: 'center' }}>
          {index}/{matchList.length - 1}
        </p>
      )}
      {pointer === matchList.length && matchList.length !== 1 && (
        <p
          style={{
            textAlign: 'center',
            backgroundColor: 'red',
            color: 'white',
          }}
        >
          You've reached the end of discover list
        </p>
      )}
      {matchList.length > 1 && <DogDetail dog={matchList[index][1]} />}
      {pointer !== matchList.length && (
        <LikeContainer>
          <LikeIcon
            className="fa-solid fa-xmark"
            title="Dislike"
            onClick={() => clickHandler(matchList[index][1], 0)}
          ></LikeIcon>
          <SuperLikeIcon
            src="https://img.icons8.com/ios-glyphs/90/0078ff/dog-paw-print.png"
            alt="a"
            title="Super like"
            onClick={() => clickHandler(matchList[index][1], 2)}
          />
          <LikeIcon
            className="fa-solid fa-check"
            onClick={() => clickHandler(matchList[index][1], 1)}
            title="Like"
          ></LikeIcon>
        </LikeContainer>
      )}
    </MainContainer>
  );
}
