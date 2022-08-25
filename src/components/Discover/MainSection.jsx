import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Title } from './Chat.styled';
import { getDistance, sortBy } from '../../helpers/geoLocation';
import { useUserStore } from '../Store.js';
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
  const userInfo = useUserStore((state) => state.userInfo);
  const [matchList, setMatchList] = useState([]);
  const [index, setIndex] = useState(0);
  const [pointer, setPointer] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [range, setRange] = useState(10);
  const [matchedImage, setMatchedImage] = useState('');
  const currentPosition = {
    lat: lat,
    lng: lng,
  };

  // get discover radius from privacy settings
  useEffect(() => {
    axios
      .get(`/api/accountSettings/privacySettings/${userInfo.id}`)
      .then((result) => {
        setRange(result.data.discovery_radius || 1000);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (lat && lng) {
      axios
        .get('/api/test')
        .then(({ data }) => {
          data = data.filter(
            (d) =>
              d.owner_id !== userInfo.id && d.lat !== null && d.lng !== null
          );
          const list = sortBy(range, currentPosition, getDistance, data);
          getDefaultMatch(list[1]);
          setMatchList(list);
        })
        .catch((err) => console.log(err));
    }
  }, [lat, lng, range, userInfo.id]);

  const clickHandler = (data, like) => {
    const likeData = {
      from_id: userInfo.id,
      to_id: data.id,
      like_level: like,
    };
    axios
      .post(`/api/test/like`, likeData)
      .then(() => {
        if (like === 0) {
          setIndex(index + 1 === matchList.length ? index : index + 1);
          setPointer(pointer + 1);
          setImageIndex(0);
        } else {
          axios
            .get('/api/test/matched', {
              params: { user_id: userInfo.id, dog_id: data.id },
            })
            .then((result) => {
              if (result.data[0]) {
                setOpenModal(true);
                setMatchedImage(result.data[0].url);
                updateMatchList();
              } else {
                setIndex(index + 1);
              }
            });
        }
      })
      .catch((err) => console.log(err));
    // if (like === 1 || like === 2) {
    //   setOpenModal(true);
    // }
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
    setImageIndex(i);
  };
  return (
    <MainContainer>
      <Title>Discover</Title>
      {/* <div style={{ height: '30px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Enter a discover range"
          style={{ height: '100%' }}
          value={range}
          onChange={(e) => {
            setRange(Number(e.target.value));
            setIndex(0);
          }}
        ></input>
        <button>Search</button>
      </div> */}
      {matchList.length === 0 && (
        <p style={{ textAlign: 'center' }}>No dog found within the range</p>
      )}
      {matchList.length > 0 && (
        <p style={{ textAlign: 'center' }}>
          {index + 1}/{matchList.length}
        </p>
      )}
      {pointer === matchList.length && matchList.length !== 0 && (
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
      {matchList.length > 0 && index < matchList.length && (
        <DogDetail
          dog={matchList[index][1]}
          updateImageIndex={updateImageIndex}
        />
      )}
      {pointer !== matchList.length && matchList.length > 0 && (
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
                    style={{ left: '25%', objectFit: 'cover' }}
                  />
                  <ModalImage
                    src={matchedImage}
                    style={{
                      right: '25%',
                      objectFit: 'cover',
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
