import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../Components/Input';
import Heatmap from '../Components/Heatmap';

const StyledTitle = styled.div`
  font-family: bitter;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  margin-top: 40px;
`;

const StyledReddit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Reddit() {
  const [posts, setPosts] = useState([]);
  const [topicChange, setTopicChange] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  return (
    <StyledReddit>
      <StyledTitle>Find the best time for a subreddit</StyledTitle>
      <Input
        setPosts={setPosts}
        setTopicChange={setTopicChange}
        setLoading={setLoading}
        setError={setError}
      />
      <Heatmap
        posts={posts}
        topicChange={topicChange}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      />
    </StyledReddit>
  );
}
