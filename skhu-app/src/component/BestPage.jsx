// 베스트 스냅샷 페이지입니다.
import NavBar from "./NavBar";
import styled from "styled-components";

const StyledWrapSnapDiv = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100vh;
`;

const BestPage = () => {
  //서버로부터 좋아요 높은 사진 찾아서 url받기 ***********************
  const top3Images = ["url_image_1.jpg", "url_image_2.jpg", "url_image_3.jpg"]; // 이러면 이 세 개의 url을 서버에 있는 사진 중 좋아요가 가장 많은 사진 3개로 바꿔주는 함수를 짜면 되지 않을까요?

  return (
    <div>
      <NavBar />
      <StyledWrapSnapDiv>
        {top3Images.map((imageUrl, index) => (
          <div key={index} style={{ width: "30%" }}>
            <img
              src={imageUrl}
              alt={`Best Snap ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid black",
              }}
            />
          </div>
        ))}
      </StyledWrapSnapDiv>
    </div>
  );
};
export default BestPage;
