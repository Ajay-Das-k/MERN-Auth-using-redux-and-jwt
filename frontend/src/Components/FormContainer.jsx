import { Children } from "react"
import{Container,Row,Col} from "react-bootstrap"
const FormContainer = () => {
  return (
    <div>
    <Container>
      <Row className="justify-content-md-center mt-5">
      <Col Xs={12} md={6} className="card p-5">
         {Children}
      </Col>
      </Row>
    </Container>
      
    </div>
  )
}

export default FormContainer
