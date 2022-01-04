import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Home from './Pages/home';
import Reddit from './Pages/reddit';
import Header from './Components/Header';
import Footer from './Components/Footer';
import theme from './Components/Theme';
import GlobalStyle from './Components/GlobalStyle';

const StyledDiv = styled.div`
  min-height: calc(100vh - 60px);
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledDiv>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/terms">
            terms-privacy
          </Route>
          <Route path="/search/:query">
            <Reddit />
          </Route>
          <Route>404 - Not Found</Route>
        </Switch>
      </StyledDiv>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
