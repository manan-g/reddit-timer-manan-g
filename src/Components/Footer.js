import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FooterLogo from './FooterLogo';

const StyledFooter = styled('footer')`
  display: flex;
  flex-direction: row;
  margin: 10px auto;
  max-width: 900px;
   
`;

const StyledLink = styled(Link)`
  font-family: ${(props) => props.theme.fontFamilyPrimary};
  font-weight: normal;
  font-size: 14px;
  text-decoration: none;
  color: ${(props) => props.theme.color.midDark};
  flex: 1;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <StyledLink as="a" href="https://profy.dev/employers">
        profy.dev
      </StyledLink>
      <FooterLogo />
      <StyledLink style={{ textAlign: 'right' }} to="/terms">
        Terms & Privacy
      </StyledLink>
    </StyledFooter>
  );
}
