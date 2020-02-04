import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import styled from "styled-components";
import { lighten } from "polished";

import Avatar from "../Avatar";
import LikeIcon from "../svg-icons/like";
import DownloadIcon from "../svg-icons/download";
import AddIcon from "../svg-icons/add";
import Button from "../Button";
import { screenLargerThan } from "../../style/util";
import {
  primaryColor1,
  white,
  likeColor,
  greenColor
} from "../../style/colors";

const ImageView = styled.img`
  width: 100%;
  height: auto;
  position: relative;
  border-radius: 30px;
`;


const UserInfo = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  height: 55px;
  color: ${primaryColor1};
  margin: 4px;
  ${screenLargerThan.tablet`
    align-items: center;
    position: absolute;
    z-index: 99;
    top: 15px;
    left: 15px;
    height: 40px;
    color: red;
    display: none;
    &:hover {
      color:white
    }
  `};
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  ${screenLargerThan.tablet`
    position: absolute;
    bottom: 0;
    z-index: 99;
    display: none;
    align-items: center;
    svg {
      width: 26px;
      height: 26px;
    }
    padding: 0px 8px;
  `};
`;

const Wrapper = styled.div`
  margin-bottom: 18px;
  border-radius: 30px;
  

`;

const Overlay = styled.div`
  position: relative;
  border-radius: 30px;
  background-color: ${props => props.backcolor};
  height:${props => props.width}px;
  ${'' /* height: calc(width*${props => props.ratio}); */}
  display:block-inline;

  ${screenLargerThan.tablet`
    margin-bottom: 12px;
    margin-left: 6px;
    margin-right: 6px;
      &:hover {
      background-color: ${lighten(0.25, primaryColor1)};
      ${ImageView} {
        opacity: 0.65;
      }
      ${UserInfo} {
        display: flex;
      }
      ${Footer} {
        display: flex;
      }
    }
  `};

`;

const DisplayName = styled.div`
  margin-left: 8px;
  font-weight: 600;
  font-size: 16px;
`;

const BtnDown = styled(Button)`
  svg {
    color: ${greenColor};
    fill: ${greenColor};
  }
  ${screenLargerThan.tablet`
    border: none;
    background-color: transparent !important;
    svg {
      color: ${white};
      fill: ${white};
    }
  `};
`;

const LikedBtn = styled(Button)`
  display: flex;
  align-items: center;
  margin: 0;
  ${props =>
    props.likedByUser &&
    `
    background-color: ${likeColor};
    color: ${white};
    &:hover {
      color: ${white};
      border-color: transparent !important;
    }
  `};
  ${screenLargerThan.tablet`
    flex-direction: column;
    height: auto;
    border: none;
    color: ${white} !important;
    background-color: transparent !important;
    svg {
      fill: ${white};
      color: ${white};
    }
    ${props =>
      props.likedByUser &&
      `
        svg {
          fill: ${likeColor};
          color: ${white};
        }
    `};
    &:hover {
      color: ${white};
    }
  `};
`;

const LikesCounter = styled.span`
  margin: 0px 6px;
`;

const CollectBtn = styled(Button)`
  display: flex;
  align-items: center;
  margin: 0;
  width: 95px;
  justify-content: space-between;
  ${screenLargerThan.tablet`
     background-color: transparent !important;
     border: none;
     span {
       display: none;
     }
     svg {
       fill: ${props =>
         props.primaryColor === greenColor ? greenColor : white};
       color: ${props =>
         props.primaryColor === greenColor ? greenColor : white};
     }
  `};
`;

const LeftBtnsWrapper = styled.div`
  display: flex;
  ${screenLargerThan.tablet`
     height: 100%;
  `};
`;

const userInfo = (userProfileLink, userName, userImage) => (
  <UserInfo target="_blank" href={userProfileLink}>
    <Avatar name={userName} imagePath={userImage} />
    <DisplayName>{userName}</DisplayName>
  </UserInfo>
);


const  refCallback = element => {
  
    if (element) {
      const width = element.offsetWidth;
      const aa = element.getAttribute('ratio');
      // element.style.height = `${width*1.3}px`; 

    }
  };

const FadeInSection = (props) => {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

const PhotoComponent = ({ photo, isLoading, ...others }) => {
  const ratio = photo.height/photo.width;

  //console.log('height', photo.height);
  //console.log('width', photo.width);
//  console.log('ratio', ratio);
  return (
  <FadeInSection>
    <Wrapper {...others}>
      <Overlay >
        {userInfo(
          photo.user.links.html,
          photo.user.name,
          photo.user.profile_image.medium
        )}

       <ImageView src={photo.urls.small} />
      
        <Footer>
          <LeftBtnsWrapper>
            <BtnDown
              target="_blank"
              href={`${photo.links.download}?force=true`}
            >
              <DownloadIcon />
            </BtnDown>
            <CollectBtn
              primary
              primaryColor={
                photo.currentUserCollections &&
                photo.currentUserCollections.length > 0
                  ? greenColor
                  : primaryColor1
              }
              onClick={() => console.log(photo.id)}
            >
              <AddIcon size={18} color={white} />
              <span>Collect</span>
            </CollectBtn>
          </LeftBtnsWrapper>
          <LikedBtn
            likedByUser={photo.likedByUser}
            onClick={() => console.log(photo.id)}
          >
            <LikeIcon
              size={18}
              color={photo.likedByUser ? white : likeColor}
              hoverColor={photo.likedByUser ? white : likeColor}
            />
            <LikesCounter>{photo.likes}</LikesCounter>
          </LikedBtn>
        </Footer>
      </Overlay><b>
       { photo.description ? 
           <p>{photo.description}</p> : <p>{photo.alt_description}</p>           
       }
       </b>
    </Wrapper>
  </FadeInSection>    
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading  
})

export default connect(mapStateToProps, null)(PhotoComponent);

// export default PhotoComponent;
