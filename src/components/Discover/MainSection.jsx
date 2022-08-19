import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Title } from './Chat.styled';
import { getDistance, sortBy } from '../../helpers/geoLocation';
import {
  MainContainer,
  LikeContainer,
  LikeIcon,
  SuperLikeIcon,
  ModalContainer,
  ModalImage,
  HeartIcon,
  Button,
  H2,
} from './MainSection.styled';
import DogDetail from './DogDetail';
import Modal from '../commonComponents/Modal';

export default function MainSection({
  lat,
  lng,
  getDefaultMatch,
  updateMatchList,
  updateReceiver,
}) {
  const navigate = useNavigate();
  const [matchList, setMatchList] = useState([]);
  const [index, setIndex] = useState(1);
  const [pointer, setPointer] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(true);
  const [range, setRange] = useState(10);
  const currentPosition = {
    lat: lat,
    lng: lng,
  };
  useEffect(() => {
    if (lat && lng) {
      axios
        .get('http://localhost:5000/api/test')
        .then(({ data }) => {
          const list = sortBy(range, currentPosition, getDistance, data);
          getDefaultMatch(list[1]);
          setMatchList(list);
        })
        .catch((err) => console.log(err));
    }
  }, [lat, lng, range]);
  const clickHandler = (data, like) => {
    const likeData = {
      from_id: matchList[0][1].owner_id,
      to_id: data.id,
      like_level: like,
    };
    axios
      .post(`http://localhost:5000/api/test/like`, likeData)
      .then(() => {
        if (like === 0) {
          setIndex(index + 1 === matchList.length ? index : index + 1);
          setPointer(pointer + 1);
          setImageIndex(0);
          updateMatchList();
        }
      })
      .catch((err) => console.log(err));
    if (like === 1 || like === 2) {
      setOpenModal(true);
    }
  };
  const startChat = (data) => {
    const receiverData = {
      id: data.owner_id,
      owner: data.owner,
      email: data.email,
      image: data.image,
    };
    updateReceiver(receiverData);
    navigate('/DiscoverMain/1');
  };
  const updateImageIndex = (i) => {
    console.log(i);
    setImageIndex(i);
  };
  return (
    <MainContainer>
      <Title>Discover</Title>
      <div style={{ height: '30px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Enter a discover range"
          style={{ height: '100%' }}
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
        ></input>
        <button>Search</button>
      </div>
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
      {matchList.length > 1 && (
        <DogDetail
          dog={matchList[index][1]}
          updateImageIndex={updateImageIndex}
        />
      )}
      {pointer !== matchList.length && matchList.length > 1 && (
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
      <div style={{ background: '#ff8700' }}>
        <Modal
          open={openModal}
          onClose={() => {
            setIndex(index + 1 === matchList.length ? index : index + 1);
            setPointer(pointer + 1);
            setImageIndex(0);
            updateMatchList();
            setOpenModal(false);
          }}
          style={{
            width: '100vw',
          }}
        >
          <ModalContainer>
            <h1 style={{ textAlign: 'center' }}>Matched!</h1>
            <div>
              {matchList[index] && (
                <div style={{ position: 'relative' }}>
                  <ModalImage
                    src={matchList[index][1].images[imageIndex]}
                    style={{ left: '25%' }}
                  />
                  <ModalImage
                    src={matchList[0][1].images[0]}
                    style={{
                      right: '25%',
                    }}
                  />
                  <HeartIcon className="fa-solid fa-heart"></HeartIcon>
                </div>
              )}
            </div>
            <Button onClick={() => startChat(matchList[index][1])}>
              Say Hi!
            </Button>
            <H2
              onClick={() => {
                setIndex(index + 1 === matchList.length ? index : index + 1);
                setPointer(pointer + 1);
                setImageIndex(0);
                updateMatchList();
                setOpenModal(false);
              }}
            >
              Continue Discovering
            </H2>
          </ModalContainer>
        </Modal>
      </div>
    </MainContainer>
  );
}