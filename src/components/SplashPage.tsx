import React from 'react';
import styled, { keyframes } from 'styled-components';

const draw = keyframes`
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: relative;
  overflow: hidden;
`;

const DoodleCanvas = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  stroke: #000;
  stroke-width: 2;
  stroke-linecap: round;
  fill: none;
`;

interface StyledProps {
  $delay: string;
}

const DoodlePath = styled.path<StyledProps>`
  stroke-dasharray: 1000;
  animation: ${draw} 3s ease-in-out forwards;
  animation-delay: ${props => props.$delay};
`;

const DoodleCircle = styled.circle<StyledProps>`
  stroke-dasharray: 1000;
  animation: ${draw} 2s ease-in-out forwards;
  animation-delay: ${props => props.$delay};
`;

const EnterButton = styled.button`
  font-family: 'Comic Sans MS', cursive;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  padding: 1rem 2rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px solid #000;
    border-radius: 25px;
    animation: ${draw} 1s ease-in-out forwards;
  }
`;

interface SplashPageProps {
  onEnter: () => void;
}

const SplashPage: React.FC<SplashPageProps> = ({ onEnter }) => {
  return (
    <Container>
      <DoodleCanvas viewBox="0 0 1000 1000">
        {/* Random doodle squiggles */}
        <DoodlePath 
          d="M100,100 C150,50 200,150 250,100 S350,50 400,100" 
          $delay="0s"
        />
        <DoodlePath 
          d="M700,200 C750,150 800,250 850,200 S950,150 1000,200" 
          $delay="0.3s"
        />
        <DoodlePath 
          d="M100,800 C150,750 200,850 250,800 S350,750 400,800" 
          $delay="0.6s"
        />
        <DoodlePath 
          d="M700,900 C750,850 800,950 850,900 S950,850 1000,900" 
          $delay="0.9s"
        />
        {/* Random circles */}
        <DoodleCircle cx="150" cy="150" r="20" $delay="1.2s" />
        <DoodleCircle cx="850" cy="850" r="15" $delay="1.5s" />
        <DoodleCircle cx="850" cy="150" r="25" $delay="1.8s" />
        <DoodleCircle cx="150" cy="850" r="18" $delay="2.1s" />
      </DoodleCanvas>
      <EnterButton onClick={onEnter}>
        psst...
      </EnterButton>
    </Container>
  );
};

export default SplashPage; 