import React from 'react';
import SearchResults from './SearchResults.jsx';
import ReactPaginate from 'react-paginate';
const axios = require('axios');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [{
        date: 'Loading...',
        description: '',
      }],
      pageCount: 1,
      pageNum: 1,
      queue: 'September'
    };
    this.getResults = this.getResults.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.getResults();
  }

  getResults() {
    axios.get(`http://localhost:3000/events`, {
      params: {
        q: this.state.queue,
        _page: this.state.pageNum
      }
    })
      .then((response) => {
        this.setState({
          events: response.data,
          pageCount: Math.ceil(response.headers['x-total-count'] / 10),
        });
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      pageNum: 1
    }, this.getResults)
  }

  handlePageClick(data) {
    let selected = data.selected + 1;
    this.setState({
      pageNum: selected
    }, this.getResults);
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="#">Historical Events Finder</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#"><span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"></a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" id='query' onChange={this.handleChange} />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Search</button>
            </form>
          </div>
        </nav>
        <table className="table table-hover">
          <tbody>
            <tr className="table-success">
              <th>Date</th>
              <th>Description</th>
            </tr>
            <SearchResults results={this.state.events} />
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'page-item disabled'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'page-item active'}
          pageLinkClassName={'page-link'}
          pageClassName={'page-item'}
          nextClassName={'page-item'}
          previousClassName={'page-item'}
          nextLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
        />
      </div>
    )
  }
}