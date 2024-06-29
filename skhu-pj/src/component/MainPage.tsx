import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import HeartCount from "./HeartCount"; // HeartCount 컴포넌트 import 추가
import "../index.css";
const StyledWrapBackground = styled.div`
  background-image: url("#"); // 서버로부터 가져온 이미지 URL ******************
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;
  position: static;
`;

const StyledWrapBottom = styled.div`
  height: 100vh;
  display: flex;
  justify-content: flex-end;
`;

const StyledNextButton = styled.div`
  padding-top: 80vh;
`;

const StyledLikeCount = styled.span`
  margin-left: 10px; /* 좋아요 수와 사운드 바 사이의 간격 설정 */
`;

const MainPage = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <>
      <StyledWrapBackground>
        <div>
          <NavBar />
        </div>
        <StyledWrapBottom>
          <StyledNextButton>
            <button>Next Image</button>{" "}
            {/* 서버에서 다른 이미지 가져오는 버튼 */}
            <input type="range" />

            <HeartCount initialCount={likeCount} /> {/* HeartCount 컴포넌트 추가 */}
            {/* 좋아요 기능 버튼 */}

          </StyledNextButton>

        </StyledWrapBottom>
      </StyledWrapBackground>
    </>
  );
};

export default MainPage;
