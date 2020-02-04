import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MenuModal from '../Menu';
import Photos from '../../components/Photos';
import { onGetPhotos, onClearPhotos,onToggleMenu } from '../../actions/photoAction';
import NotFound from '../NotFound';
import {sizes} from '../../style/util';


const Title = styled.h2`
  margin: 40px 0;
  text-align: center;
`;

const Wrapper = styled.div`
  max-width: ${sizes.giant}; 
  margin-top:80px;
  margin-left: 40px;
  margin-right: 40px;
`;



class Home extends Component {
  componentDidMount() {
    const { onClearPhotos, onGetPhotos } = this.props;
    onClearPhotos();
    onGetPhotos({query: '', page: 1, per_page: 10, url: 'photos'});
  }

  render() {
    const { photos, isLoading, page,bMenu,scrollTop} = this.props.photos;
    const { onGetPhotos,onToggleMenu } = this.props;
    const isPhotoAvailable = photos && photos.length > 0;
  //  console.log("this.props:",this.props);
    return (
      <Wrapper>
        <Helmet>
          <title>Home - Default Photos</title>
        </Helmet>        
        <Title> </Title>
        {!isPhotoAvailable && <NotFound />}
        {photos && 
          <Photos
            items={photos}
            onScrollToLoad={() =>
              isLoading ? console.log('Loading') : onGetPhotos({query: '', page: page, per_page: 10, url: 'photos'})
            }
          />
        }

        { bMenu && <MenuModal/>}

      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  photos: state.photos,
})

export default connect(mapStateToProps, {
  onGetPhotos,
  onClearPhotos,
  onToggleMenu
})(Home);
