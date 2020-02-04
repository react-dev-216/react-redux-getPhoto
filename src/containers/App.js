import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import store from '../store';

import Home from './Home';
import UserPhotos from './UserPhotos';

import Footer from './Footer';
import SideBar from './SideBar';
import MenuModal from './Menu';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

const Wrapper = styled.div`
  height: 100vh;
  display:flex container;
  flex-direction:flex-column;
`;
const ContentWrapper = styled.div`
  justify-content:center;
  align_items:center;
  text-align:center;

`;

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <Wrapper>
              <Helmet>
                <meta charSet="utf-8" />
                <title>XOTV FrontEnd TEST</title>
              </Helmet>
              <Wrapper>
                <SideBar />
                <ContentWrapper>
                  <Route exact path="/photos" component={UserPhotos} />
                  <Route exact path="/" component={Home} />
                </ContentWrapper>
                
                <Footer />
              </Wrapper>
            </Wrapper>
          </Router>
        </Provider>
    );
  }
}

export default App;
