import React from 'react';
import SearchResults from './SearchResults.jsx';
import ReactPaginate from 'react-paginate';
import NavBar from './NavBar.jsx';
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
    axios.get(`/events`, {
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
        <NavBar handleSubmit={this.handleSubmit} handleChange={this.handleChange}></NavBar>
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
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
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