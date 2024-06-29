import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosBase from "./AxiosBase";
import styled from "styled-components";
import { Photo } from "./type";
import HeartCount from "./HeartCount";

const StyledWrapSnapDiv = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100vh;
`;

const ImageContainer = styled.div`
  width: 30%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border: 1px solid black;
  cursor: pointer; // Change cursor to pointer to indicate clickability
`;

const BestPage = () => {
  const [top3Images, setTop3Images] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTop3Images = async () => {
      try {
        const response = await AxiosBase.get("/photo/find/all");
        console.log("API response:", response);

        if (response.status === 200 && response.data) {
          console.log("Response data:", response.data);
          const images = response.data;
          console.log("Images received:", images);

          if (images && images.length > 0) {
            setTop3Images(images.slice(0, 3));
          } else {
            setError("No images found in the response");
          }
        } else {
          console.error("Failed to fetch top 3 images");
          setError("Failed to fetch top 3 images");
        }
      } catch (error) {
        console.error("Error fetching top 3 images:", error);
        setError("Error fetching top 3 images");
      }
    };

    fetchTop3Images();
  }, []);

  const handleImageClick = (id: string) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div>
      <StyledWrapSnapDiv>
        {error ? (
          <div>{error}</div>
        ) : (
          top3Images.map((photo, index) => (
            <ImageContainer key={photo.id}>
              <Image
                src={photo.imagePath}
                alt={`Best Snap ${index + 1}`}
                onClick={() => handleImageClick(photo.id)}
              />
              <div><p>장소: {photo.title}</p></div>
              <div>좋아요 수: {photo.like_count} <HeartCount/></div>
            </ImageContainer>
          ))
        )}
      </StyledWrapSnapDiv>
    </div>
  );
};

export default BestPage;
