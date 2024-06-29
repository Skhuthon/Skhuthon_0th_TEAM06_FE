// 웹 방문 시 제일 처음 출력되는 스타트 화면입니다.
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;
  position: static;
`;

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <Div id="wrapper">
      <div>
        <div>
          <h1>로고</h1>
          <div id="button">
            <button onClick={() => navigate("/Main")}>실행하기</button>
          </div>
        </div>
      </div>
    </Div>
  );
};
export default StartPage;
