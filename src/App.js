import React, { 
  Component 
} from 'react';
import {
  connect
} from 'react-redux';
import { 
  BrowserRouter as Router, 
  Route,
} from 'react-router-dom';
import { 
  LinkContainer 
} from 'react-router-bootstrap';
import {
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';
import Home from './Home';
import Cart from './Cart';
import Product from './Product';
import { 
  FaShoppingCart
} from 'react-icons/fa';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div>
            <Navbar bg="danger" expand="lg" fixed="top">
              <Container>
                <LinkContainer to={'/'}>
                  <Navbar.Brand href="/" className="text-light">ZANE STORE</Navbar.Brand>
                </LinkContainer>
                <Nav className="flex-row float-right">
                  <LinkContainer to={'/cart'}>
                    <Nav.Link href="/cart" className="text-light"><FaShoppingCart /> Cart ({this.props.cart.length})</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Container>
            </Navbar>
            <Route path="/" exact component={Home} />
            <Route path="/products/:product_id" component={Product} />
            <Route path="/cart" component={Cart} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default connect(state => state)(App);