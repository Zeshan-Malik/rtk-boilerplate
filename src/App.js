import { Provider } from "react-redux";
import store from './services/Store';
import { ThemeProvider } from "@mui/material";
import theme from "./Config/theme";
import RouteList from './Config/routes/routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouteList />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
