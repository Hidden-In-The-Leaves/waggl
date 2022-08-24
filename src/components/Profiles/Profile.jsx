import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import DogDetail from '../Discover/DogDetail';

export default function Profile(props) {
  const { dogid } = useParams();
  const [dog, setDog] = useState({});
  useEffect(() => {
    axios
      .get(`/api/test/dog?dogId=${dogid}`)
      .then(({ data }) => setDog(data))
      .catch((err) => console.log(err));
  }, [dogid]);
  return (
    <div style={{ margin: '5%' }}>
      {dog.id && <DogDetail dog={dog} updateImageIndex={() => {}} />}
    </div>
  );
}
