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
  Button,
} from 'react-bootstrap';
import axios from 'axios';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const { match: { params }} = this.props;
    console.log();
    if (this.props.location.state && this.props.location.state.product) {
      this.setState({
        product: this.props.location.state.product
      });
    } else {
      axios({
        method: 'GET',
        url: 'https://e-commerce-zan3.herokuapp.com/api/products/'+params.product_id,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) =>  {
        console.log(response.data);
        this.setState({
          product: response.data
        });
      })
      .catch(error =>  {
        console.log(error);
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container className="mt-3" ref={(ref) => this.main_container = ref}>
          <Card>
            <Card.Body>
              {
                this.state.product &&
                <Row>
                  <Col md={{ span: 4 }}>
                    <Image 
                      src={this.state.product.photo}
                      fluid
                    />
                  </Col>
                  <Col md={{ span: 8 }}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <label>Name:</label>
                        <p className="mb-0">{this.state.product.name}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <label>Description:</label>
                        <p className="mb-0">{this.state.product.description}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <label>Brand:</label>
                        <p className="mb-0">{this.state.product.brand}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <label>Size:</label>
                        <p className="mb-0">{this.state.product.size}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <label>Camera:</label>
                        <p className="mb-0">{this.state.product.camera}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <label>Network:</label>
                        <p className="mb-0">{this.state.product.network}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <label>CPU:</label>
                        <p className="mb-0">{this.state.product.cpu}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <label>Memory Storage:</label>
                        <p className="mb-0">{this.state.product.memory}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <label>Display:</label>
                        <p className="mb-0">{this.state.product.display}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <label>Battery:</label>
                        <p className="mb-0">{this.state.product.battery}</p>
                      </ListGroup.Item>
                    </ListGroup>
                    <Button 
                      variant="primary"
                      onClick={() => {
                        this.props.dispatch({
                          type: 'ADD_TO_CART',
                          payload: this.state.product
                        });
                      }}
                      block>
                      Add to Cart
                    </Button>
                  </Col>
                </Row>
              }
            </Card.Body>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(state => state)(Cart);