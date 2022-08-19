import React from 'react';
import styled from 'styled-components';
import Post from './Post';

const dummyData = [
  {
    poster_photo_url: 'https://res.cloudinary.com/duzrmpk7h/image/upload/v1660860725/images/Ellipse_18_muu5bv.png',
    poster: 'Matt',
    posted_time: '20 minutes ago',
    text: 'Does anyone want to create a meetup event for next Saturday?',
    photo_url: 'https://res.cloudinary.com/duzrmpk7h/image/upload/v1660921711/images/Rectangle_96_tnccga.png',
  }, {
    poster_photo_url: 'https://res.cloudinary.com/duzrmpk7h/image/upload/v1660860725/images/Ellipse_17_mcwn2c.png',
    poster: 'Patt',
    posted_time: 'an hour ago',
    text: 'I had so much fun at the BBQ in the park last weekend! Thank you everyone that came.',
    photo_url: 'https://res.cloudinary.com/duzrmpk7h/image/upload/v1660849582/images/Rectangle_101_oiaach.png',
  },
  {
    poster_photo_url: 'https://res.cloudinary.com/duzrmpk7h/image/upload/v1660860725/images/Ellipse_18_muu5bv.png',
    poster: 'Matt',
    posted_time: 'yesterday',
    text: 'This is the best pack ever!',
    photo_url: 'https://res.cloudinary.com/duzrmpk7h/image/upload/v1660849582/images/Rectangle_101_oiaach.png',
  },
];

export default function FeedList() {
  const posts = dummyData;
  return (
    <Scroller>
      {posts.map((post) => <Post key={post.id} post={post} />)}
    </Scroller>
  );
}

const Scroller = styled.div`
  overflow-y: auto;
  max-height: 90%;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`;
