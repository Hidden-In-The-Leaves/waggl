import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import OwnerDetails from '../../Profiles/OwnerDetails';

export default function Post({ post }) {
  const [imageOpen, setImageOpen] = useState(false);
  const [openOwnerProfile, setOpenOwnerProfile] = useState(false);
  console.log(post)
  return (
    <Container>
      <FlexRow>
        <RoundImg src={post.poster_photo_url} />
        <MainText onClick={() => setOpenOwnerProfile(true)}>{post.poster}</MainText>
        <SubText>{formatDistanceToNow(new Date(post.posted_time))} ago</SubText>
      </FlexRow>
      <Text>{post.text}</Text>
      {post.photo_url && (
        <Img src={post.photo_url} onClick={() => setImageOpen(true)} />
      )}
      <Dialog open={imageOpen} onClose={() => setImageOpen(false)} fullWidth>
        <ImgEnlarged src={post.photo_url} />
      </Dialog>
      <OwnerDetails userId={post.poster_id} open={openOwnerProfile} onClose={() => setOpenOwnerProfile(false)} />
    </Container>
  );
}

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
