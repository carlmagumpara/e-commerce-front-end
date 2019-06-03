import React, { 
  Component 
} from 'react';
import {
  connect
} from 'react-redux';

class Cart extends Component {
  render() {
    return (
      <React.Fragment>
        Cart
      </React.Fragment>
    );
  }
}

export default connect(state => state)(Cart);