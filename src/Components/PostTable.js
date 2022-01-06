/* eslint-disable react/no-unused-prop-types,react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Heads = ['Title', 'Time Posted', 'Score', 'Comments', 'Author'];

const StyledHeading = styled.div`
  font-size: large;
  font-weight: 600;
  font-family: ${(props) => props.theme.fontFamilyPrimary};
`;

const StyledTable = styled.table`
  border: 0px;
  border-left: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.color.text};
  border-spacing: 0px;
  width: 65vw;
  margin: 5px 0px 50px;
`;

const StyledRow = styled.tr`
  border: 0px;
  border-left: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.color.text};
  width: 100%;
`;

const StyledData = styled.td`
  /* border: 1px solid ${(props) => props.theme.color.text}; */
  border: 0px;
  border-right: 1px;
  border-bottom: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.color.text};
  padding: 5px;
`;

const StyledHead = styled.th`
  border: 0px;
  border-top: 1px;
  border-bottom: 1px;
  border-right: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.color.text};
  padding: 5px;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

function PostTable({ posts }) {
  return (
    <>
      {posts?.length !== 0 && (
        <div style={{ marginTop: '25px' }}>
          <StyledHeading>Posts</StyledHeading>
          <StyledTable>
            <thead>
              <StyledRow>
                {Heads.map((head) => (
                  <StyledHead key={uuidv4()}>{head}</StyledHead>
                ))}
              </StyledRow>
            </thead>
            <tbody>
              {posts.map((post) => (
                <StyledRow key={uuidv4()}>
                  <StyledData style={{ width: '50%' }}>
                    <StyledLink
                      href={`https://www.reddit.com${post?.data?.permalink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post?.data?.title.substring(0, 60)}
                      {post?.data?.title.length > 60 && '...'}
                    </StyledLink>
                  </StyledData>
                  <StyledData style={{ width: '11%' }}>
                    {new Date(post?.data?.created_utc * 1000)
                      .toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                      .toLocaleLowerCase()}
                  </StyledData>
                  <StyledData style={{ width: '7%' }}>
                    {post?.data?.score}
                  </StyledData>
                  <StyledData style={{ width: '8%' }}>
                    {post?.data?.num_comments}
                  </StyledData>
                  <StyledData style={{ width: '11%' }}>
                    {post?.data?.author !== '[deleted]' ? (
                      <StyledLink
                        href={`https://reddit.com/user/${post?.data?.author}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post?.data?.author.substring(0, 10)}
                        {post?.data?.author.length > 10 && '...'}
                      </StyledLink>
                    ) : (
                      <div style={{ color: '#0000ee' }}>
                        {post?.data?.author.substring(0, 10)}
                        {post?.data?.author.length > 10 && '...'}
                      </div>
                    )}
                  </StyledData>
                </StyledRow>
              ))}
            </tbody>
          </StyledTable>
        </div>
      )}
    </>
  );
}
/*
"data": {
  "author_fullname": "t2_wjv56",
  "title": "Ember 4.0 released",
  "score": 4,
  "author": "ahmad_musaffa",
  "num_comments": 0,
  "permalink": "/r/javascript/comments/rl7hxx/ember_40_released/",
  "created_utc": 1640065506.0,
}
*/

PostTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array,
};

PostTable.defaultProps = {
  posts: [],
};

export default PostTable;
