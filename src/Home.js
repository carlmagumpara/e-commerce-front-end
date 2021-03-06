import React, { 
  Component 
} from 'react';
import {
  connect
} from 'react-redux';
import { 
  LinkContainer 
} from 'react-router-bootstrap';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup
} from 'react-bootstrap';
import axios from 'axios';
import {
  truncate,
  numberWithCommas
} from './Utils';

let queryString = require('query-string');

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entities: {
        data: [],
        current_page: 1,
        from: 1,
        last_page: 1,
        per_page: 9,
        to: 1,
        total: 0,
      },
      first_page: 1,
      current_page: 1,
      sorted_column: 'created_at',
      offset: 4,
      order: 'desc',
      brand: null,
      brands: [
        'All',
        'Samsung',
        'Huawei',
        'Xiaomi',
        'iPhone',
        'Oppo',
        'Vivo',
      ],
      product_modal: false
    };
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.setState({ 
      entities: {
        ...this.state.entities,
        per_page: parsed.per_page ? parseInt(parsed.per_page) : 9,
      },
      current_page: parsed.page ? parseInt(parsed.page) : 1,
      sorted_column: parsed.column ? parsed.column : 'created_at',
      order: parsed.order ? parsed.order : 'desc',
    }, () => {
      this.fetchEntities();
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const parsed = queryString.parse(nextProps.location.search);
    if (typeof parsed.page !== 'undefined' && parseInt(parsed.page) !== this.state.current_page) {
      this.setState({ 
        entities: {
          ...this.state.entities,
          per_page: parsed.per_page ? parseInt(parsed.per_page) : 9,
        },
        current_page: parsed.page ? parseInt(parsed.page) : 1,
        sorted_column: parsed.column ? parsed.column : 'created_at',
        order: parsed.order ? parsed.order : 'desc',
      }, () => {
        this.fetchEntities();
      });
    }
  }

  fetchEntities() {
    let url = 'https://e-commerce-zan3.herokuapp.com/api/products?page='+this.state.current_page+'&orderColumn='+this.state.sorted_column+'&orderBy='+this.state.order+'&perPage='+this.state.entities.per_page;
    let params = `?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}`;
    if (this.state.brand !== null) {
      url = 'https://e-commerce-zan3.herokuapp.com/api/products?brand='+this.state.brand+'&page='+this.state.current_page+'&orderColumn='+this.state.sorted_column+'&orderBy='+this.state.order+'&perPage='+this.state.entities.per_page;
      params = `?brand=${this.state.brand}&page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}`;
    }

    axios({
      method: 'GET',
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ this.props.token
      },
    })
    .then(response => {
      this.setState({ 
        entities: response.data,
      });
      if (this.props.location.search !== params) {
        this.props.history.push({
          pathname: '/',
          search: params,
          state: {}
        });
      }
    })
    .catch(error =>  {
      console.log(error);
    });
  }

  changePage(pageNumber) {
    this.setState({ 
      current_page: pageNumber 
    }, () => {
      this.fetchEntities();
      window.scrollTo({ top: this.main_container.offsetTop, behavior: 'smooth' });
    });
  }

  pagesNumbers() {
    if (!this.state.entities.to) {
      return [];
    }
    let from = this.state.entities.current_page - this.state.offset;
    if (from < 1) {
      from = 1;
    }
    let to = from + (this.state.offset * 2);
    if (to >= this.state.entities.last_page) {
      to = this.state.entities.last_page;
    }
    let pagesArray = [];
    for (let page = from; page <= to; page++) {
      pagesArray.push(page);
    }
    return pagesArray;
  }

  list() {
    if (this.state.entities.data.length) {
      return this.state.entities.data.map((product) => {
        return (
          <Col key={product.product_id} md={{ span: 4 }}>
            <Card className="mb-3">
              <LinkContainer 
                to={{ 
                  pathname: '/products/'+product.product_id, 
                  search: '',
                  state: {
                    product
                  }
                }}>
                <Card.Body
                  className="cursor-pointer">
                  <Card.Img 
                    variant="top" 
                    src={product.photo}
                    className="mb-3"
                  />
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    &#8369;{numberWithCommas(product.price)}
                  </Card.Text>
                  <Card.Text>
                    {truncate(product.description, 40)}
                  </Card.Text>
                </Card.Body>
              </LinkContainer>
              <Card.Footer className="bg-white">
                <Button 
                  variant="primary"
                  onClick={() => {
                    this.props.dispatch({
                      type: 'ADD_TO_CART',
                      payload: product
                    });
                  }}
                  block>
                  Add to Cart
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        );
      })
    } else {
      return (
        <React.Fragment>
          <p>No products available</p>
        </React.Fragment>
      )
    }
  }

  pageList() {
    return this.pagesNumbers().map(page => {
      return <li className={ page === this.state.entities.current_page ? 'page-item active' : 'page-item' } key={page}>
        <button className="page-link" onClick={() => this.changePage(page)}>{page}</button>
      </li>
    })
  }

  render() {
    return (
      <React.Fragment>
        <Container className="mt-3" ref={(ref) => this.main_container = ref}>
          <Row>
            <Col md={{ span: 3, }}>
              <Card className="mb-3">
                <Card.Header className="bg-white">
                  Brand
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {
                      this.state.brands.map((brand) => {
                        return (
                          <ListGroup.Item 
                            key={brand}
                            className="cursor-pointer"
                            onClick={() => {
                              this.setState({
                                brand: brand === 'All' ? null : brand,
                              },() => {
                                this.fetchEntities();
                              });
                            }}>
                            <p className="mb-0">{brand}</p>
                          </ListGroup.Item>
                        );
                      })
                    }
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Header className="bg-white">
                  Price
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      className="cursor-pointer"
                      onClick={() => {
                        this.setState({
                          sorted_column: 'price',
                          order: 'desc',
                        },() => {
                          this.fetchEntities();
                        });
                      }}>
                      <p className="mb-0">Highest to Lowest</p>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="cursor-pointer"
                      onClick={() => {
                        this.setState({
                          sorted_column: 'price',
                          order: 'asc',
                        },() => {
                          this.fetchEntities();
                        });
                      }}>
                      <p className="mb-0">Lowest to Highest</p>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={{ span: 9, }}>
              <div className="data-table">
                <div className="p-3">
                  <Row>
                    {this.list()}
                  </Row>
                </div>
                { 
                  this.state.entities.data &&
                  <React.Fragment>
                    <div className="text-center">
                      <p>Showing {this.state.entities.data.length} of {this.state.entities.total} entries.</p>
                      <ul className="pagination d-flex justify-content-center">
                        <li className="page-item">
                          <button className="page-link"
                            disabled={ 1 === this.state.entities.current_page }
                            onClick={() => this.changePage(this.state.entities.current_page - 1)}>
                            Previous
                          </button>
                        </li>
                        {this.pageList()}
                        <li className="page-item">
                          <button className="page-link"
                            disabled={this.state.entities.last_page === this.state.entities.current_page}
                            onClick={() => this.changePage(this.state.entities.current_page + 1)}>
                            Next
                          </button>
                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                }
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(state => state)(Home);