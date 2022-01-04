import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
body {
  margin: 0px;
  padding: 0px;
  ${'' /* background-color: #c3c3c3; */}
}
@font-face {
  font-family: Bitter;
  src: url(/fonts/Bitter-VariableFont_wght.woff2);
}
@font-face {
  font-family: Montserrat;
  src: url(/fonts/Montserrat-Bold.woff2);
  font-weight:bold;
  font-style: normal;
}
@font-face {
  font-family: Montserrat;
  src: url(/fonts/Montserrat-Italic.woff2);
  font-weight:normal;
  font-style: italic;
}
@font-face {
  font-family: Montserrat;
  src: url(/fonts/Montserrat-Regular.woff2);
  font-weight:normal;
  font-style: normal;
}
@font-face {
  font-family: Montserrat;
  src: url(/fonts/Montserrat-Medium.woff2);
  font-weight:medium;
  font-style: normal;
}
`;
