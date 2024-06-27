// nav바입니다.
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDivNav = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 8px 16px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff4500;
  }
`;

const NavBar = () => {
  return (
    <StyledDivNav>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/BestSnap" style={{ marginLeft: "20px" }}>
        Best Snapshot
      </StyledLink>
    </StyledDivNav>
  );
};
export default NavBar;
