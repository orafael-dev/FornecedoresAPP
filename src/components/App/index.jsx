import { ThemeProvider } from "styled-components";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import defaultTheme from "../../assets/styles/themes/default"
import { Container } from './styles'
import Header from '../Header';
import Routes from "../../Routes";

 function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
    <GlobalStyles />
    <Container>
      <Header />
      <Routes />
    </Container>
    </ThemeProvider>
  );
}

export default App;
