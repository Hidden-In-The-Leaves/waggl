import React from 'react';
import styled from 'styled-components';

export default function AddPictureCard({ setImage }) {
  const fileHandler = (e) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // convert image file to base64 string
      setImage(reader.result);
      // const url = await uploadPhoto(reader.result);
    }, false);

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Card>
      <input type="file" id="file-input" hidden onChange={fileHandler} />
      <PlusImg src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/ff8700/external-plus-user-interface-tanah-basah-glyph-tanah-basah-2.png" onClick={() => document.getElementById('file-input').click()} />
    </Card>
  );
}

const Card = styled.div`
  border: 1px solid #AFAFAF;
  border-radius: 20px;
  width: 30%;
  height: 180px;
  margin: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

const PlusImg = styled.img`
  height: 90px;
  width: 90px;
`;