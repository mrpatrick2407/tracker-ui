import Contents from './Contents.jsx'
import { NavLink } from 'react-router-dom'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {IoAdd} from 'react-icons/io5'
import {Container, Navbar,Nav,NavItem ,Tooltip,OverlayTrigger,NavDropdown,Dropdown} from 'react-bootstrap'
import React from 'react';

import Search from './Search.jsx'
import SigninNavlink from './SigninNavlink.jsx'
import UserContext from './UserContext.js'


function Navi( {user,onUserChange}){
    const Create = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Create Issue
        </Tooltip>
      );
    return(
            <Navbar  bg="light" expand="md">
              <Navbar.Brand className="dark">ISSUETRACKER</Navbar.Brand>
              
                <Nav >
                  <NavItem>
                    <NavLink exact to="/" className="nav-link">
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/issues" className="nav-link">
                      Issues
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/report" className="nav-link">
                      Report
                    </NavLink>
                  </NavItem>
                </Nav>

                <Nav style={{position:'absolute',right:'125px',cursor:"pointer"}} >
                
                <SigninNavlink user={user} onUserChange={onUserChange}/>
                </Nav>

                <Nav style={{position:'absolute',right:'30px'}} >
                  
                <Dropdown as="div" drop='start'>
                <Dropdown.Toggle variant='secondary' >
                <BsThreeDotsVertical/>
                    
                   </Dropdown.Toggle >

                  <Dropdown.Menu >
                       <Dropdown.Item   href='/about' >
                           About
                       </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
                    
               
                
                </Nav>
            </Navbar>
          
        
    )
}
function Footer() {  return (    <small>      <p className="text-center">        Full source code available at this        {' '}        <a href="https://github.com/mrpatrick2407/MERN">          GitHub repository        </a>      </p>    </small>  ); }
export default class Pages extends React.Component{
  constructor(props) {
    super(props);
    this.state = { user: { signedIn: false ,givenName:''} };

    this.onUserChange = this.onUserChange.bind(this);
  }

  async componentDidMount() {
    const response = await fetch(`auth/user`, {
      method: 'POST',
    credentials: 'include',

    });
    const body = await response.text();
    const result = JSON.parse(body);
    const { signedIn, givenName } = result;
    
    this.setState({ user: { signedIn:signedIn,givenName:givenName } });
  }

  onUserChange(user) {
    this.setState({ user });
  }
render(){
  const {user}=this.state;
    return(
        <div>
            <Navi user={user} onUserChange={this.onUserChange}/>
            <Container  fluid >
              <UserContext.Provider value={user}>
                  <Contents />
              </UserContext.Provider>
            
            </Container>
            <Footer/>
        </div>
    )
}
}