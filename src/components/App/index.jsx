import { ThemeProvider } from "styled-components";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import defaultTheme from "../../assets/styles/themes/default"
import { Container } from './styles'
import Header from '../Header';
import Routes from "../../Routes";
import ToastContainer from "../Toast/ToastContainer";

 function App() {
  console.log('APP renderizou')
  return (
    <ThemeProvider theme={defaultTheme}>
    <GlobalStyles />
    <ToastContainer />
    <Container>
      <Header />
      <Routes />
    </Container>
    </ThemeProvider>
  );
}

export default App;
