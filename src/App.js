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
  Nav,
  Navbar,
} from 'react-bootstrap';
import Home from './Home';
import Cart from './Cart';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div>
            <Navbar bg="light" expand="lg">
              <LinkContainer to={'/'}>
                <Navbar.Brand href="/">Zan3</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <LinkContainer to={'/cart'}>
                  <Nav.Link href="/cart">{this.props.cart.length} Cart</Nav.Link>
                </LinkContainer>
              </Navbar.Collapse>
            </Navbar>
            <Route path="/" exact component={Home} />
            <Route path="/cart" component={Cart} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default connect(state => state)(App);