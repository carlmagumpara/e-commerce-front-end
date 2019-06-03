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
  Card
} from 'react-bootstrap';
import axios from 'axios';

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
        per_page: 10,
        to: 1,
        total: 0,
      },
      first_page: 1,
      current_page: 1,
      sorted_column: 'created_at',
      offset: 4,
      order: 'desc',
      search: '',
      search_data: [],
    };
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.setState({ 
      entities: {
        ...this.state.entities,
        per_page: parsed.per_page ? parseInt(parsed.per_page) : 10,
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
          per_page: parsed.per_page ? parseInt(parsed.per_page) : 10,
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
    axios({
      method: 'GET',
      url: 'https://e-commerce-zan3.herokuapp.com/api/products?page='+this.state.current_page+'&orderColumn='+this.state.sorted_column+'&orderBy='+this.state.order+'&perPage='+this.state.entities.per_page,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ this.props.token
      },
    })
    .then(response => {
      console.log(response.data);
      this.setState({ 
        entities: response.data,
      });
      // if (this.props.location.search !== `?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}`) {
      //   this.props.history.push({
      //     pathname: '/lawyer/promos-and-prizes/my-prizes',
      //     search: `?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}`,
      //     state: {}
      //   });
      // }
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

  tableList() {
    if (this.state.entities.data.length) {
      return this.state.entities.data.map((product) => {
        return (
          <Col key={product.product_id} md={{ span: 4 }}>
            <Card className="mt-3 mb-3">
              <Card.Img 
                variant="top" 
                src={'https://e-commerce-zan3.herokuapp.com/'+product.photo}
              />
              <Card.Body>

              </Card.Body>
            </Card>
          </Col>
        );
      })
    } else {
      return (
        <React.Fragment>
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
        <Container>
          <Row>
            <Col md={{ span: 8, }}>
              <Card className="lexmeet__main-card mb-3 shadow-sm" ref={(ref) => this.main_container = ref}>
                <Card.Body className="p-0">
                  <div className="data-table">
                    <div className="p-3">
                      <Row>
                        {this.tableList()}
                      </Row>
                    </div>
                    { 
                      this.state.entities.data &&
                      <Row className="table-pagination" noGutters>
                        <Col md={{ span: 6 }} className="mt-1">
                          <span>Showing {this.state.entities.data.length} of {this.state.entities.total} entries.</span>
                        </Col>
                        <Col md={{ span: 6 }} className="mt-1 d-flex justify-content-end">
                          <ul className="pagination">
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
                        </Col>
                      </Row>
                    }
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={{ span: 4, }}>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(state => state)(Home);