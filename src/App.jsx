import { ThemeProvider } from "styled-components";
import GlobalStyles from "./assets/styles/GlobalStyles";
import defaultTheme from "./assets/styles/themes/default"

 function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
    <GlobalStyles />
    <h1>FornecedoresApp</h1>
    </ThemeProvider>
  );
}

export default App;
