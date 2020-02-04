import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import '../../css/App.css'
import { white, dividerColor,primaryColor1,secondaryColor1,
        borderActiveColor } from '../../style/colors';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');        

const Wrapper = styled.div`
  background-color: ${white};
  padding-top : 20px;  
  display:inline-block;
`;
const Menu = styled.div`  
  background-color: ${white};
  position:fixed;
  top:70px;
  right:0px;
  width:300px;
  height:auto;
  border-radius:5px;
  box-shadow: 2px 2px 5px 2px rgb(200,200,200,0.7);
  z-index:100;
  display:inline-block;
  
`;
const MenuItem = styled.span`
    padding:10px;
    color:${primaryColor1};
    background-color: ${white};
    border-radius:5px;
    font-weight: bold;

    &:hover {
        background-color:rgb(210,210,210);     
        cursor:pointer; 
    }

`;

const MenuModal = () => {

        return(
        <Wrapper  >
            <ReactCSSTransitionGroup transitionName = "animate" 
               transitionAppear = {true} transitionAppearTimeout = {1000}
               transitionEnter = {false} transitionLeave = {false}
               transitionEnterTimeout = {500} transitionLeaveTimeout = {500}>

               
                    <Menu className="d-flex flex-column">
                        <MenuItem >My Account Info </MenuItem>
                        <MenuItem>Search key</MenuItem>
                    </Menu>
                

            </ReactCSSTransitionGroup>
        </Wrapper>
        )

}

export default MenuModal