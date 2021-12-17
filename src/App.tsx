import './App.css';
import { Container, createTheme, ThemeProvider } from "@mui/material"
import MainContainer from "./components/MainContainer/MainContainer"
import RTL from "./components/RTL/RTL";

function App() {

  const theme = createTheme({
    direction: 'rtl',
    typography: {
      fontFamily: [
        'Vazir', 'sans-serif'
      ].join(','),
    },
    palette:{
      mode: 'dark',
      primary: {
        main: '#ffaa2e'
      },
    }
  })

  return (
    <RTL>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Container maxWidth="md">
            <MainContainer/>
          </Container>
        </div>
      </ThemeProvider>
    </RTL>
  );

}

export default App;
