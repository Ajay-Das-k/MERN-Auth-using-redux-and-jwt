
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {

   const BASE_URL = "http://localhost:8000/";
   const { userInfo } = useSelector((state) => state.auth);
   let avatarUrl = `${BASE_URL}images/userProfile/${userInfo?.image}`;
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        {userInfo ? (
          <>
            <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
              <img
                src={avatarUrl}
                alt=""
                className="avatar-img"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                  padding: "3px",
                }}
              />
              <h5>Welcome {userInfo.isAdmin ? "Admin" : "User"}</h5>
              <h3 className="text-uppercase">{userInfo.name}</h3>
            </Card>
          </>
        ) : (
          <>
            <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
              <h1 className="text-center mb-4">MERN Authentication</h1>
              <p className="text-center mb-4">
                This is a boilerplate for MERN authentication that stores a JWT
                in an HTTP-Only cookie. It also uses Redux Toolkit and the React
                Bootstrap library
              </p>
              <div className="d-flex">
                <LinkContainer to="/login">
                  <Button variant="primary" href="/login" className="me-3">
                    Sign In
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="secondary" href="/register">
                    sign Up
                  </Button>
                </LinkContainer>
              </div>
              <Row className="py-3">
                <Col>
                  Are u a Admin ? <Link to="/admin">Admin Login</Link>
                </Col>
              </Row>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
}

export default Hero
