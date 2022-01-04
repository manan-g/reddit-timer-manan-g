/* eslint-disable react/no-unused-prop-types,react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function PostTable({ posts }) {
  useEffect(() => {
    console.log(posts);
    return () => {};
  }, []);
  return <div>{posts && posts[0]?.data.title}</div>;
}

PostTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array,
};

PostTable.defaultProps = {
  posts: [],
};

export default PostTable;

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
