import React, { 
  Component 
} from 'react';
import {
  connect
} from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Button
} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { 
  FaTrash
} from 'react-icons/fa';
import {
  numberWithCommas
} from './Utils';

class Cart extends Component {
  render() {
    return (
      <React.Fragment>
        <Container className="mt-3" ref={(ref) => this.main_container = ref}>
          <Card>
            <Card.Header className="bg-light">
              Cart
            </Card.Header>
            <Card.Body>
              {
                this.props.cart.length !== 0 ? (
                  <ListGroup variant="flush">
                    {
                      this.props.cart.map((product) => {
                        return (
                          <ListGroup.Item key={product.product_id}>
                            <Row>
                              <Col md={{ span: 2, }}>
                                <Image 
                                  src={product.photo}
                                  thumbnail
                                />
                              </Col>
                              <Col md={{ span: 6, }}>
                                <p>{product.name}</p>
                              </Col>
                              <Col md={{ span: 4, }}>
                                <Row>
                                  <Col md={{ span: 4, }}>
                                    <p>&#8369;{numberWithCommas(product.price)}</p>
                                  </Col>
                                  <Col md={{ span: 2, }}>
                                    <p>X</p>
                                  </Col>
                                  <Col md={{ span:4, }}>
                                    <NumericInput 
                                      className="form-control" 
                                      min={1} 
                                      max={100} 
                                      value={product.total}
                                      onChange={(valueAsNumber) => {
                                        this.props.dispatch({
                                          type: 'INCREMENT',
                                          payload: {
                                            product,
                                            count: valueAsNumber
                                          }
                                        });
                                      }}
                                    />
                                  </Col>
                                  <Col md={{ span: 2, }}>
                                    <Button 
                                      variant="danger"
                                      onClick={() => {
                                        this.props.dispatch({
                                          type: 'REMOVE',
                                          payload: product
                                        });
                                      }}>
                                      <FaTrash />
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        );
                      })
                    }
                  </ListGroup>
                ) : (
                  <p className="h5 text-center">Your cart is empty</p>
                )
              }
            </Card.Body>
              <Card.Footer className="text-right bg-light d-flex justify-content-end">
                <p className="mb-0">
                  Total Price: &#8369;{numberWithCommas(this.props.cart.reduce((total, product) => total + (parseInt(product.price, 10) * product.total) , 0))}
                </p>
                <Button
                  className="ml-3" 
                  variant="danger"
                  onClick={() => {

                  }}
                  disabled={this.props.cart.length === 0}>
                  Checkout
                </Button>
              </Card.Footer>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(state => state)(Cart);