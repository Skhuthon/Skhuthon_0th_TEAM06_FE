// 메인 페이지(사진 셔플되는 페이지) 입니다.
import React, { useState } from "react";
import NavBar from "./NavBar";
import styled from "styled-components";

const StyledWrapBackground = styled.div`
  background-image: url("#"); // 서버로에서 꺼내온 이미지? ******************
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;
  position: static;
`;
const StyledWrapBottom = styled.div`
  height: 100vh;
  /* border: 1px solid black; */
  display: flex;
  justify-content: flex-end;
`;
const StyledNextButton = styled.div`
  padding-top: 80vh;
`;
const StyledLikeCount = styled.span`
  margin-left: 10px; /* 좋아요 수와 사운드 바 사이의 간격을 설정 */
`;

const MainPage = () => {
  const [likeCount, setLikeCount] = useState(0);

  const [liked, setLiked] = useState(false); // 좋아요 상태를 나타내는 상태

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
            <button>next Image</button>{" "}
            {/*onClick시 서버에 있는 다른 이미지, 음성파일 갖고오기************************8*/}
            <input type="range" />
            <button onClick={handleLike}>좋아요</button>{" "}
            {/* 세션스토리지 사용해서 로그인? 버튼이 아닌 이미지로 가져와서 작업 or 애니매이션 효과?********************************8 */}
            <StyledLikeCount>{likeCount} Likes</StyledLikeCount>
          </StyledNextButton>
        </StyledWrapBottom>
      </StyledWrapBackground>
    </>
  );
};
export default MainPage;
