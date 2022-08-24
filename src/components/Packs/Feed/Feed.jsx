/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Container_2_3, Title } from '../../../styledComponents';
import FeedList from './FeedList';
import AddPost from './AddPost';

export default function Feed({ packId }) {
  const [feedData, setFeedData] = useState();

  const renderPosts = () => {
    axios({
      method: 'GET',
      url: '/api/packs/posts',
      params: {
        pack_id: packId,
      },
    })
      .then((result) => setFeedData(result.data))
      .catch((err) => console.log('Error getting pack posts', err));
  };

  useEffect(() => {
    renderPosts();
  }, []);

  if (!feedData) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <AddPost renderPosts={renderPosts} />
      <FeedList posts={feedData} />
    </div>
  );
}
