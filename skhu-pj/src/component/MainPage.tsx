import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import AxiosBase from "./AxiosBase"; // Import Axios instance configured for your base URL
import HeartCount from "./HeartCount"; // HeartCount 컴포넌트 import 추가
import "../index.css";
import { Photo } from "./type";

const StyledWrapBackground = styled.div`
  background-image: url("#"); // 서버로부터 가져온 이미지 URL
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 1150px; // Set a maximum width for the image container
  max-height: 863px; // Set a maximum height for the image container
  display: flex;
  justify-content: center; // Center the image horizontally within the container
  align-items: center; // Center the image vertically within the container
  overflow: hidden; // Hide overflow to ensure image fits within the container
`;

const StyledWrapSnapDiv = styled.div`
  display: flex;
  justify-content: center; // Center the image container horizontally
  align-items: center; // Center the image container vertically
  height: 100vh;
`;

const StyledWrapBottom = styled.div`
  display: flex;
  justify-content: center; // Center the tools horizontally
  align-items: center; // Center the tools vertically
  width: 100%;
  position: absolute;
  bottom: 20px; // Adjust as needed to move the tools up or down
`;

const StyledNextButton = styled.div`
  margin-right: 10px;
`;

const StyledLikeCount = styled.span`
  margin-left: 10px; /* 좋아요 수와 사운드 바 사이의 간격 설정 */
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover; // Maintain aspect ratio and cover the container
  cursor: pointer; // Change cursor to pointer to indicate clickability
`;

const MainPage = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [randomImage, setRandomImage] = useState<Photo | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchRandomImage = async () => {
    try {
      const response = await AxiosBase.get("/photo/find/random"); // Adjust endpoint according to your backend API
      console.log("API response:", response); // Debug: Log the API response

      if (response.status === 200 && response.data) {
        console.log("Response data:", response.data); // Log the entire response data
        const image = response.data; // Assuming your API returns a single image object
        console.log("Image received:", image); // Debug: Log the image
        setRandomImage(image);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.load(); // Load the new audio
          audioRef.current.play(); // Play the new audio
        }
      } else {
        console.error("Failed to fetch random image");
        setError("Failed to fetch random image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setError("Error fetching image");
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <StyledWrapBackground>
      <NavBar />
      <StyledWrapSnapDiv>
        {error ? (
          <div>{error}</div>
        ) : (
          randomImage && (
            <>
              <ImageContainer key={randomImage.id}>
                <StyledImage
                  src={randomImage.imagePath}
                  alt="Random Snap"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.play();
                    }
                  }}
                />
              </ImageContainer>
              <audio ref={audioRef} controls style={{ display: 'none' }}>
                <source src={randomImage.audioPath} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </>
          )
        )}
      </StyledWrapSnapDiv>
      <StyledWrapBottom>
        <StyledNextButton>
          <button onClick={fetchRandomImage}>Next Image</button>
          {/* 서버에서 다른 이미지 가져오는 버튼 */}
        </StyledNextButton>
        <input type="range" />
        <HeartCount initialCount={likeCount} /> {/* HeartCount 컴포넌트 추가 */}
        <button onClick={handleLike}>
          {liked ? "Unlike" : "Like"} <StyledLikeCount>{likeCount}</StyledLikeCount>
        </button>
        {/* 좋아요 기능 버튼 */}
      </StyledWrapBottom>
    </StyledWrapBackground>
  );
};

export default MainPage;
