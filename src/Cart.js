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
  Image
} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';

class Cart extends Component {
  render() {
    return (
      <React.Fragment>
        <Container className="mt-3" ref={(ref) => this.main_container = ref}>
          <Card>
            <Card.Header>
              Shopping Cart
            </Card.Header>
            <Card.Body>
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
                          <Col md={{ span: 8, }}>
                            <p>{product.name}</p>
                            <p>{product.total}</p>
                          </Col>
                          <Col md={{ span: 2, }}>
                            <NumericInput 
                              className="form-control" 
                              min={0} 
                              max={100} 
                              value={product.total}
                              onChange={(valueAsNumber) => {
                                this.props.dispatch({
                                  type: 'ADD_TO_CART',
                                  payload: product
                                });
                              }}
                            />
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })
                }
              </ListGroup>
            </Card.Body>
              <Card.Footer className="text-right">
                <p>
                  Total Price: {this.props.cart.reduce((total, product) => total + (parseInt(product.price, 10) * product.total) , 0)}
                </p>
              </Card.Footer>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(state => state)(Cart);