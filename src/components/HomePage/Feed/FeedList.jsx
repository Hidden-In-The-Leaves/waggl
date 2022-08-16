import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { usePostsStore } from '../Store';

export default function FeedList() {
  const posts = usePostsStore((state) => state.posts);
  return (
    <Scroller>
      {posts.map((post) => <Post key={post.id} post={post} />)}
    </Scroller>
  )
}

const Scroller = styled.div`
  overflow-y: auto;
  max-height: 90%;
`;
