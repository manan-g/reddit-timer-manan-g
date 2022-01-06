/* eslint-disable */
/* no-underscore-dangle,
react/no-array-index-key,
react/jsx-one-expression-per-line,
no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import PostTable from './PostTable';
import Loader from './Loader';

function DividePostsToMatrixOfHourOfWeek(posts) {
  const timedPosts = Array.from(Array(24 * 7));
  // const utcTime = posts[0].data.created_utc;
  // const earliestDate = new Date(utcTime * 1000);
  // const index = earliestDate.getDay() * 24 + earliestDate.getHours();
  // const minutes = earliestDate.getMinutes();

  // if (!timedPosts[index]) {
  //   timedPosts[index] = [];
  // }
  // timedPosts[index].push(posts[0]);

  let curr;
  for (let i = 0; i <= 499; i += 1) {
    curr = new Date(posts[i].data.created_utc * 1000);
    curr = curr.getDay() * 24 + curr.getHours();
    if (!timedPosts[curr]) {
      timedPosts[curr] = [];
    }
    // posts[i].jsdate = new Date(posts[i].data.created_utc*1000)
    timedPosts[curr].push(posts[i]);
  }

  // only works if offset remains same
  // using the relative difference in time to find the index to put the post in
  // for (let i = 1; i <= 499; i += 1) {
  //   // difference in seconds
  //   curr = posts[i].data.created_utc - utcTime + minutes * 60;

  //   // converted in hours
  //   curr /= 3600;

  //   // if negative then make it +ve
  //   while (curr < 0) curr += 24 * 7;

  //   // converting float to int
  //   // eslint-disable-next-line operator-assignment ,no-bitwise
  //   curr = curr | 0;

  //   // calculate index using relative hours
  //   curr = (index + curr) % (24 * 7);

  //   if (!timedPosts[curr]) {
  //     timedPosts[curr] = [];
  //   }
  //   // posts[i].jsdate = new Date(posts[i].data.created_utc*1000)
  //   timedPosts[curr].push(posts[i]);
  // }
  return timedPosts;
}
function getMaxSubArrayLength(timedPosts) {
  let maxLength = 0;
  // console.log(timedPosts);
  timedPosts.forEach((element) => {
    if (element) if (element.length > maxLength) maxLength = element.length;
  });
  // console.log(maxLength);
  return maxLength;
}

const timeLabels = [
  '12:00 AM',
  '2:00 AM',
  '4:00 AM',
  '6:00 AM',
  '8:00 AM',
  '10:00 AM',
  '12:00 PM',
  '2:00 PM',
  '4:00 PM',
  '6:00 PM',
  '8:00 PM',
  '10:00 PM',
];

const dayLabels = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const StyledHeatMap = styled.div`
  display: grid;
  grid-auto-flow: dense;
  height: 350px;
  width: 95%;
  grid-template: 1.5fr repeat(7, 1fr) / 3fr repeat(24, 1fr);
  font-family: ${(props) => props.theme.fontFamilyPrimary};
  /* font-size: small; */
  margin: 20px auto 10px;
`;

const StyledTimes = styled.div`
  grid-row: 1;
  grid-column: span 2;
  grid-area: ${(props) =>
    `1 / ${2 + props.index * 2} / 2 / ${4 + props.index * 2}`};
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBoxShadow = styled.div`
  grid-area: 1 / 2 / 2 / -1;
  background-color: #fafafa;
  box-shadow: inset 0px 0px 28px 1px #a6a4a436;
  /* background-color: red; */
`;

const StylesDays = styled.div`
  grid-column: 1;
  background-color: #1e2537;
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const colors = [
  '#e0e5a3',
  '#a9d194',
  '#a0ce93',
  '#8cc894',
  '#5eb391',
  '#3984a3',
];

const StyledPost = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${(props) => {
    if (props.length > 8 * props.maxLength) return colors[5];
    if (props.length > 6 * props.maxLength) return colors[4];
    if (props.length > 4 * props.maxLength) return colors[3];
    if (props.length > 2 * props.maxLength) return colors[2];
    if (props.length > 0) return colors[1];
    return colors[0];
  }};

  :hover {
    box-shadow: inset 0 0 1px 1px black;
    cursor: pointer;
  }
  :active {
    transform: scale(0.97);
  }
`;

const SubStyledTitle = styled.div`
  margin-top: 8px;
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.theme.color.text};
`;

function Heatmap({ posts, topicChange, loading, setLoading, error, setError }) {
  const [timedPosts, setTimedPosts] = useState([]);
  const [maxLength, setMaxLength] = useState(0);
  const [timedPostIndex, setTimedPostIndex] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled && loading === true) {
      setTimedPostIndex();
    }
    return () => {
      isCancelled = true;
    };
  }, [setTimedPostIndex, loading]);

  useEffect(() => {
    let isCancelled = false;
    const runAsync = async () => {
      if (!isCancelled && posts.length) {
        const _timedPosts = DividePostsToMatrixOfHourOfWeek(posts);
        setTimedPosts(_timedPosts);
        // console.log(_timedPosts);
        setMaxLength(getMaxSubArrayLength(_timedPosts) / 10);
        setLoading(false);
      }
    };
    runAsync();
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicChange]);

  useEffect(() => {
    let isCancelled = false;
    if (isCancelled && error === {}) {
      const runAsync = async () => {
        await new Promise((res) => setTimeout(() => res(), 1000));
        setError(false);
      };
      runAsync();
    }
    return () => {
      isCancelled = true;
    };
  }, [error, setError]);

  return (
    <>
      {error ? (
        <div>Some Error Occured!</div>
      ) : !loading ? (
        <>
          <StyledHeatMap>
            <div style={{ gridArea: '1/1' }} />
            <div style={{ display: 'none' }}>Heatmap</div>
            <StyledBoxShadow />
            {timeLabels.map((timeLabel, index) => (
              <StyledTimes key={index} index={index}>
                {timeLabel}
              </StyledTimes>
            ))}
            {dayLabels.map((dayLabel, index) => (
              <StylesDays key={index}>{dayLabel}</StylesDays>
            ))}
            {timedPosts &&
              timedPosts.map((post, index) => (
                <StyledPost
                  key={uuidv4()}
                  length={post ? post.length : 0}
                  maxLength={maxLength}
                  onClick={() => {
                    setTimedPostIndex(index);
                  }}
                >
                  {post ? post.length : 0}
                </StyledPost>
              ))}
          </StyledHeatMap>
          <SubStyledTitle>
            All times are shown in your timezone:{' '}
            <span style={{ fontWeight: '600' }}>
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </span>
          </SubStyledTitle>
          {timedPostIndex !== undefined && (
            <PostTable posts={timedPosts[timedPostIndex]} />
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

Heatmap.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array.isRequired,
  topicChange: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
};

export default Heatmap;
