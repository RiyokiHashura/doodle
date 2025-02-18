import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useVoiceMessages } from '../context/VoiceMessageContext';

const float = keyframes`
  0% { transform: translate(0, 0) rotate(${() => getRandomRotation()}deg); }
  50% { transform: translate(0, -5px) rotate(${() => getRandomRotation()}deg); }
  100% { transform: translate(0, 0) rotate(${() => getRandomRotation()}deg); }
`;

const MessagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  padding-bottom: 180px;
  max-width: 1200px;
  margin: 0 auto;
`;

const getRandomColor = () => {
  const colors = ['#fff9b1', '#d4f5ff', '#ffdfed', '#e1f3d8', '#ffd7d7'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomRotation = () => {
  return Math.random() * 8 - 4;
};

const MessageItem = styled.div`
  position: relative;
  background: #fff;
  padding: 1rem;
  min-height: 140px;
  transform: rotate(${() => getRandomRotation()}deg);
  transition: transform 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${() => Math.random() * 2}s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #000;
    border-radius: 2px;
    transform: rotate(${() => (Math.random() * 2 - 1)}deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%) rotate(${() => (Math.random() * 4 - 2)}deg);
    width: 30px;
    height: 30px;
    background: #000;
    mask-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 3C17 3 19 5 19 8C19 11 17 14 15 14C13 14 11 11 11 8C11 5 13 3 15 3Z' fill='black'/%3E%3C/svg%3E");
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 3C17 3 19 5 19 8C19 11 17 14 15 14C13 14 11 11 11 8C11 5 13 3 15 3Z' fill='black'/%3E%3C/svg%3E");
  }

  &:hover {
    transform: scale(1.05) rotate(${() => getRandomRotation()}deg);
    z-index: 1;
  }
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.7rem;
  color: #000;
  font-family: 'Comic Sans MS', cursive;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.5;
  padding: 0;
  width: 20px;
  height: 20px;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 14px;
    height: 2px;
    background: #000;
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover {
    opacity: 1;
  }
`;

const AudioPlayer = styled.audio`
  width: 100%;
  height: 40px;
  margin-top: 0.5rem;

  &::-webkit-media-controls-panel {
    background: none;
    border: 2px solid #000;
    border-radius: 20px;
    transform: rotate(${() => (Math.random() * 1 - 0.5)}deg);
    padding: 5px;
  }

  &::-webkit-media-controls-play-button {
    background-color: transparent;
    border: 2px solid #000;
    border-radius: 50%;
    transform: rotate(${() => (Math.random() * 2 - 1)}deg);
    margin: 0 5px;
    width: 25px;
    height: 25px;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  &::-webkit-media-controls-current-time-display,
  &::-webkit-media-controls-time-remaining-display {
    font-family: 'Comic Sans MS', cursive;
    font-size: 12px;
    color: #000;
    transform: rotate(${() => (Math.random() * 1 - 0.5)}deg);
  }

  &::-webkit-media-controls-timeline {
    background-color: transparent;
    border: 1px solid #000;
    border-radius: 10px;
    height: 4px;
    transform: rotate(${() => (Math.random() * 0.5 - 0.25)}deg);
    margin: 0 10px;
  }

  &::-webkit-media-controls-volume-slider {
    background-color: transparent;
    border: 1px solid #000;
    border-radius: 10px;
    height: 4px;
    transform: rotate(${() => (Math.random() * 0.5 - 0.25)}deg);
  }

  &::-webkit-media-controls-mute-button {
    background-color: transparent;
    border: 2px solid #000;
    border-radius: 50%;
    transform: rotate(${() => (Math.random() * 2 - 1)}deg);
    margin: 0 5px;
    width: 20px;
    height: 20px;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  &::-webkit-media-controls-volume-slider-container {
    transform: rotate(${() => (Math.random() * 0.5 - 0.25)}deg);
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #000;
  font-family: 'Comic Sans MS', cursive;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(${() => getRandomRotation()}deg);
    width: 200px;
    height: 2px;
    background: #000;
  }
`;

const MessageList: React.FC = () => {
  const { messages, deleteMessage, addMessage } = useVoiceMessages();

  useEffect(() => {
    if (messages.length === 0) {
      const sampleAudios = [
        '/sample1.mp3',
        '/sample2.mp3',
        '/sample3.mp3'
      ];

      sampleAudios.forEach((audio, index) => {
        const timestamp = new Date();
        timestamp.setMinutes(timestamp.getMinutes() - (index * 15));
        
        fetch(audio)
          .then(response => response.blob())
          .then(blob => {
            addMessage(blob, timestamp);
          })
          .catch(console.error);
      });
    }
  }, [messages.length, addMessage]);

  if (messages.length === 0) {
    return (
      <MessagesContainer>
        <EmptyState>
          tap to record your first note!
        </EmptyState>
      </MessagesContainer>
    );
  }

  return (
    <MessagesContainer>
      {messages.map((message) => (
        <MessageItem key={message.id}>
          <MessageHeader>
            <span>
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            <DeleteButton onClick={() => deleteMessage(message.id)} />
          </MessageHeader>
          <AudioPlayer controls>
            <source src={message.audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </AudioPlayer>
        </MessageItem>
      ))}
    </MessagesContainer>
  );
};

export default MessageList; 