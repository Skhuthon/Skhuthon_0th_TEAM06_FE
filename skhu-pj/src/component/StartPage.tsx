// StartPage.tsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import '../css/LoginModal.scss';
const Div = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;
`;

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/Main');
  };

  return (
    <Div id="wrapper">
      <div>
        <h1>로고</h1>
        <div id="button">
          <button onClick={handleLogin}>실행하기</button>
        </div>
      </div>
      <LoginModal onLogin={() => {}} />
    </Div>
  );
};

export default StartPage;
