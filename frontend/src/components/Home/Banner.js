import React from "react";
import styled from "styled-components";
import logo from "../../imgs/logo.png";

const BannerWrapper = styled.div`
background-color: ${({ theme }) => theme.colors.dark}
`;

const Banner = () => {
  return (
    <BannerWrapper>
      <div className="banner text-white">
        <div className="container p-4 text-center">
          <img src={logo} alt="banner" />
          <div>
            <span>A place to </span>
            <span id="get-part">get</span>
            <span> the cool stuff.</span>
          </div>
        </div>
      </div>
    </BannerWrapper>
  );
};

export default Banner;