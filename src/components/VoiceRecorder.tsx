import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useVoiceMessages } from '../context/VoiceMessageContext';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const RecorderContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 1rem;
  z-index: 100;
`;

const RecordButton = styled.button<{ $isRecording: boolean }>`
  background: ${props => props.$isRecording ? '#ff4444' : '#fff'};
  border: 2px solid #000;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  ${props => props.$isRecording && `
    animation: ${pulse} 1.5s ease-in-out infinite;
  `}

  &:hover {
    transform: scale(1.05);
  }

  &::after {
    content: '${props => props.$isRecording ? 'recording...' : 'tap to record'}';
    position: absolute;
    width: 100%;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    bottom: -30px;
    font-size: 0.9rem;
    white-space: nowrap;
  }
`;

const StatusText = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) rotate(${() => (Math.random() * 2 - 1)}deg);
  background: #fff;
  padding: 0.5rem 1rem;
  border: 2px solid #000;
  border-radius: 20px;
  font-size: 1rem;
  color: #000;
  z-index: 100;
`;

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const { addMessage } = useVoiceMessages();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        addMessage(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError('oops! microphone access needed...');
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <RecorderContainer>
      <RecordButton 
        onClick={toggleRecording} 
        $isRecording={isRecording}
      />
      {error && <StatusText>{error}</StatusText>}
    </RecorderContainer>
  );
};

export default VoiceRecorder; 