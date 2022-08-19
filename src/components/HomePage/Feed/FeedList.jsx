import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { usePostsStore } from '../Store';

export default function FeedList() {
  const posts = usePostsStore((state) => state.posts);
  return (
    <Scroller>
      {posts.length === 0 && (
        <div style={{ color: 'grey', textAlign: 'center', paddingTop: '10%' }}>
          <div>No Posts.</div>
          <div>Join more packs to see more content!</div>
        </div>
      )}
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
