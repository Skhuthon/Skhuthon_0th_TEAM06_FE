import React, { useState, useEffect } from "react";
import AxiosBase from "./AxiosBase"; // Import Axios instance configured for your base URL
import NavBar from "./NavBar";
import styled from "styled-components";

const StyledWrapSnapDiv = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100vh;
`;

const BestPage = () => {
  const [top3Images, setTop3Images] = useState<string[]>([]);

  useEffect(() => {
    const fetchTop3Images = async () => {
      try {
        const response = await AxiosBase.get("/top3images"); // Adjust endpoint according to your backend API
        if (response.status === 200 && response.data) {
          const { images } = response.data; // Assuming your API returns an object with 'images' array
          setTop3Images(images); // Set state with fetched image URLs
        } else {
          console.error("Failed to fetch top 3 images");
        }
      } catch (error) {
        console.error("Error fetching top 3 images:", error);
      }
    };

    fetchTop3Images();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

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
