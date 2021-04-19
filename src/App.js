import styled from 'styled-components'
import Home from './components/Home';
import wallpaper from './gamewallpaper.jpg'

function App() {
  return (
    <AppContainer>
      <Home/>
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