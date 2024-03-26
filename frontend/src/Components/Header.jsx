
import {Navbar,Nav,Container,NavDropdown,Badge} from 'react-bootstrap'
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import{useSelector,useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
const apiUrl = process.env.BASE_URL;




const Header = () => {
  const BASE_URL = "http://localhost:8000/";
 
  const { userInfo } = useSelector((state) => state.auth);
   const avatarUrl = `${BASE_URL}images/userProfile/${userInfo?.image}`;
   console.log(apiUrl);
   console.log(import.meta.env);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

   const logoutHandler = async () => {
     try {
       await logoutApiCall().unwrap();
       dispatch(logout());
       navigate("/login");
     } catch (err) {
       console.error(err);
     }
   };
  
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>U M S</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown
                    title={
                      <span>
                        <img
                          src={avatarUrl}
                          alt="Avatar"
                          className="avatar-img"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginLeft: "10px",
                            padding: "3px",
                          }}
                        />
                        {userInfo.name}
                      </span>
                    }
                    id="username"
                  >
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="avatar-img"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />

                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header
