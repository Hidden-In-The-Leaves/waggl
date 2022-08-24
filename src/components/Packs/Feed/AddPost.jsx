import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useUserStore } from '../../Store';
import { Button } from '../../../styledComponents';
import uploadPhoto from '../../../lib/uploadPhoto';

export default function AddPost({ post, renderPosts }) {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const userInfo = useUserStore((state) => state.userInfo);
  const { packid } = useParams();

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const fileHandler = (e) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // convert image file to base64 string
      setImagePreview(reader.result);
      // const url = await uploadPhoto(reader.result);
    }, false);

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (imagePreview) {
      uploadPhoto(imagePreview)
        .then((url) => {
          axios({
            method: 'POST',
            url: '/api/packs/posts',
            data: {
              pack_id: packid,
              text,
              poster_id: userInfo.id,
              photo_url: url,
            },
          })
        })
        .then(() => {
          renderPosts();
          setText('');
        })
        .catch((err) => console.log(err));
    } else {
      axios({
        method: 'POST',
        url: '/api/packs/posts',
        data: {
          pack_id: packid,
          text,
          poster_id: userInfo.id,
          photo_url: '',
        },
      })
        .then(() => {
          renderPosts();
          setText('');
        })
        .catch((err) => console.log(err));
    }

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
      <div style={{ display: 'flex' }}>
        <RoundImg src={userInfo.profile_pic_url} />
        <TextArea onChange={changeHandler} value={text} />
      </div>
      {imagePreview && (
        <div>
          <img style={{ width: '100%', height: '20vh', objectFit: 'cover' }} src={imagePreview} />
        </div>
      )}
      <div style={{ display: 'flex', alignSelf: 'flex-end' }}>
      <input type="file" id="file-input" hidden onChange={fileHandler} />
        <img style={{ margin: '2%', width: '30px', height: '30px' }} onClick={() => document.getElementById('file-input').click()} src="https://img.icons8.com/external-basicons-line-edtgraphics/50/ff8700/external-Photo-images-basicons-line-edtgraphics.png" />
        <Button style={{ margin: '2%', padding: '0 20px' }} onClick={submit} >Post</Button>
      </div>
    </div>
  );
}


const TextArea = styled.textarea`
  border: 1px solid #9F9F9F;
  border-radius: 10px;
  height: 40px;
  width: 100%;
  height: 70px;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.div`
  padding: 15px;
  border-bottom: 1px solid #D9D9D9;
`;

const RoundImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 3%;
`;

const MainText = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding-right: 3%;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

const SubText = styled.div`
  font-size: 14px;
`;

const Text = styled.div`
  font-size: 16px;
  padding-top: 10px;
`;

const Img = styled.img`
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin: 3% 0;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

const ImgEnlarged = styled.img`
  /* width: 80vh; */
  max-height: 70%;
  object-fit: cover;
`;
