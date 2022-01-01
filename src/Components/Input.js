/* eslint-disable comma-dangle */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { defaultQuery } from '../Util';

const StyledP = styled.p`
  display: inline;
  margin-top: 8px;
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.theme.color.text};
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.color.orange};
  color: ${(props) => props.theme.color.light};
  border: none;
  border-radius: 4px;
  height: 30px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  height: 26px;
  padding: 0px 4px;
  border: 1px solid ${(props) => props.theme.color.text};
  border-radius: 2px;
  margin: 10px 6px;
  width: 250px;
  max-width: 250px;
  :focus {
    outline: none;
    border-color: black;
  }
`;

function Input({ setPosts }) {
  const params = useParams();
  const [query, setQuery] = useState(params ? params.query : defaultQuery);

  const history = useHistory();
  // const [title, setTitle] = useState();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push(query);
    // try {
    // const result = await axios.get(
    //   `https://www.reddit.com/r/${query}/new.json`
    // );
    // setPosts(result.data.data.children);
    // // setTitle(result.data.data.children[0].data.title);
    // } catch (err) {
    // setError(err);
    // }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();
    const runAsync = async () => {
      try {
        setPosts([]);
        setQuery(params ? params.query : defaultQuery);
        let result;
        // eslint-disable-next-line no-plusplus
        for (let count = 0; count < 5; count++) {
          const url = `https://www.reddit.com/r/${
            params ? params.query : defaultQuery
          }/top.json?t=year&limit=100${
            count === 0 ? '' : `&after=${result.data.data.after}`
          }`;

          // eslint-disable-next-line no-await-in-loop
          result = await axios.get(url, {
            signal: controller.signal,
          });
          if (!isCancelled) {
            // eslint-disable-next-line
            setPosts((prev) => {
              const arrayPosts = result.data.data.children;
              if (prev) {
                prev.push(...arrayPosts);
                return prev;
              }
              return result.data.data.children;
            });
          }
        }
      } catch (e) {
        if (!isCancelled) {
          // console.log(e);
          setError(e);
        }
      }
    };
    runAsync();
    return () => {
      controller.abort();
      isCancelled = true;
    };
  }, [setPosts, params, params.query]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <StyledP>r /</StyledP>
        <StyledInput onChange={handleChange} value={query} />
        <StyledButton type="submit">SEARCH</StyledButton>
      </form>
    </div>
  );
}

Input.propTypes = {
  setPosts: PropTypes.func.isRequired,
};

export default Input;
