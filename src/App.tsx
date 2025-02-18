import React from 'react';
import styled from 'styled-components';
import VoiceRecorder from './components/VoiceRecorder';
import MessageList from './components/MessageList';
import { VoiceMessageProvider } from './context/VoiceMessageContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #fff;
  padding: 2rem;
  font-family: 'Comic Sans MS', cursive;
`;

function App() {
  return (
    <VoiceMessageProvider>
      <AppContainer>
        <VoiceRecorder />
        <MessageList />
      </AppContainer>
    </VoiceMessageProvider>
  );
}

export default App;
