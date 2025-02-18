import React, { useState } from 'react';
import styled from 'styled-components';
import VoiceRecorder from './components/VoiceRecorder';
import MessageList from './components/MessageList';
import SplashPage from './components/SplashPage';
import { VoiceMessageProvider } from './context/VoiceMessageContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #fff;
  padding: 2rem;
  font-family: 'Comic Sans MS', cursive;
`;

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleEnter = () => {
    setShowSplash(false);
  };

  return (
    <VoiceMessageProvider>
      {showSplash ? (
        <SplashPage onEnter={handleEnter} />
      ) : (
        <AppContainer>
          <VoiceRecorder />
          <MessageList />
        </AppContainer>
      )}
    </VoiceMessageProvider>
  );
}

export default App;
