import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Router';
import './App.css';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import customTheme from '../src/components/Themes/CustomTheme'

function App() {
  return (
  <div className='App'>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <ThemeProvider theme={customTheme}>
            <Router />
        </ThemeProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </div>
  );
}

export default App;
// React router dom is no longer support exact property, and Switch is replaced by Routes
// All the material component rerendered by the 'Router' component and
// its child components will use our custom theme 