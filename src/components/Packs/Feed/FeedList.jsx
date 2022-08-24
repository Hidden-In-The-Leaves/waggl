import React from 'react';
import styled from 'styled-components';
import Post from './Post';

export default function FeedList({ posts }) {
  return (
    <Scroller>
      {posts.map((post) => <Post key={post.id} post={post} />)}
    </Scroller>
  );
}

const Scroller = styled.div`
  overflow-y: auto;
  height: 60vh;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`;
