import styled from 'styled-components'
import Game from './components/Game';
import Home from './components/Home';
import wallpaper from './gamewallpaper.jpg'
import React from 'react';
import {Helmet} from 'react-helmet';

function App() {
  const [page, setPage] = React.useState('home');
  const [highScore, setHighScore] = React.useState(-1);
  return (
    <AppContainer>
      <Helmet>
        <title>Reactjs-Universe-Cruiser</title>
      </Helmet>
      {page==='home' &&
        <Home setPage={setPage} highScore={highScore}/>
      }
      {page==='play' &&
        <Game setPage={setPage} setHighScore={setHighScore}/>
      }
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
  width: 100%;
  color: white;
  background-image: url(${wallpaper});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;