import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import menu_Icon from '../../components/svg-icons/menu'
import add from '../../components/svg-icons/add'
import close from '../../components/svg-icons/close'
import _Logo from '../../components/svg-images/camera';
import _Nav from '../../components/Navigation';
import TextInput from '../../components/TextInput';
import Link from '../../components/Link';
import { white, dividerColor } from '../../style/colors';
import { onGetUsers, onSelectUser } from '../../actions/userAction';
import { onGetPhotos, onClearPhotos,onToggleMenu} from '../../actions/photoAction';
import NotFound from '../NotFound';

const Wrapper = styled.div`
  background-color: ${white};
  padding-top : 20px;
`;

const Logo = styled(_Logo)`
  width: 45px;
  height: 45px;
  padding:8px;
  &:hover{
    background-color:rgb(210,210,210);
    border-radius:15px
  }
  &:active{
    border:4px solid #4090FF;
  }
`;

const TopBarWrapper = styled.div`
  background-color: ${white};
  border-bottom: solid 2px ${dividerColor};
  position: fixed;
  z-index: 9999;
  display: flex;
  width:100%;
  flex-direction:flex-column;

  align-items: center;
  justify-content: space-around;
  justify-content:flex-start;
  top:0;
  left:0;

`;

const TopBar = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  padding: 0px 8px;
`;

const SearchTx = styled(TextInput)`
  flex: 1;
  margin: 0px 16px;
  width :100%;

`;

const Controller = styled.div`
  display: flex;
  align-items: center;
`;

const UsersBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: calc(100% - 65px);
  overflow-y: auto;
`;

const Button = styled.span`
    background-color: rgb(200,200,200,0);
    opacity:1;
    color: black;
    display: flex;
    margin: 0px;
    padding: 5px;
    justify-content: center;
    align-items: align-base;
    align-items:center;
    border-radius: 20px; 
    border:3px solid rgb(0,0,0,0);
    &:hover{
      background-color: rgb(220,220,220,1);
      cursor:pointer;
    }
    &:active{
    border:3px solid #4090FF;
  }
`;

const Menu_Icon=styled(menu_Icon)`
    width:30px;
    height:25px;
    border-radius: 5px; 

`;


const AButton = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 6px 8px;
`;

class SideBar extends Component {
  state = {
    lastScrollTop: 0,
    topBarFixed: false,
    searchTxVal: ''
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.queryValue !== this.props.queryValue &&
      nextProps.queryValue !== this.state.searchTxVal &&
      nextProps.queryValue === ''
    ) {
      this.setState({ searchTxVal: '' });
    }
  }

  onHandleGetUsers = () => {
    const { onGetUsers } = this.props;
    const { searchTxVal } = this.state;
    debounce(() => {
      onGetUsers({query: searchTxVal, page: 1, per_page: 15, url: 'search/users'});
    }, 600)();
  }

  onSearchTxChange = e => {
    e.persist();
    console.log(1111, e.target);
    this.setState({ searchTxVal: e.target.value }, () => {
      this.onHandleGetUsers();
    });
  };

  onSelectUser = (username) => {
    const { onSelectUser, onClearPhotos, onGetPhotos } = this.props;
    onSelectUser({username});
    onClearPhotos();
    onGetPhotos({query: '', page: 1, per_page: 3, url: `/users/${username}/photos`});
    this.props.history.push('/photos');
  };

  onGoHome = () => {
      window.scrollTo(0,0)    
  }

  render() {
    const { users, selectedUser } = this.props.users;
    const {onToggleMenu,onGoHome} = this.props;
    const { searchTxVal} = this.state;
    const isUserAvailable = users && users.length > 0;

    return (
      <Wrapper>
        <TopBarWrapper className='d-flex flex-row justify-content-between'>
          <TopBar className='d-flex col-7 col-sm-7 col-lg-9'>
            <Link to='/'><Logo /></Link>
            <Controller className='d-flex col-12'>
              <SearchTx size="60"
                value={searchTxVal}
                onChange={this.onSearchTxChange}
                hintText="Search"
                rounded
              />{' '}
            </Controller>
          </TopBar>
          <Button onClick={this.onGoHome}>
           <b>Home</b>
          </Button>
          <Button>
           <b>Login</b>
          </Button>
          <Button onClick={onToggleMenu}>
            <Menu_Icon />
          </Button>
          {/* <UsersBlock>
            {!isUserAvailable && <NotFound />}
            {users && users.map((user, index) => {
              return <AButton key={index} onClick={() => {this.onSelectUser(user.username)}}>{user.username}</AButton>
            })}
          </UsersBlock> */}
        </TopBarWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps, {
  onGetUsers,
  onSelectUser,
  onClearPhotos,
  onGetPhotos,
  onToggleMenu

})(withRouter(SideBar));
