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
      data: [],
      offset: 0,
      pageCount: 1
    };
    this.getResults = this.getResults.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.getResults('September');
  }

  getResults(queue) {
    axios.get(`http://localhost:3000/events?q=${queue}`)
      .then((response) => {
        this.setState({
          events: response.data,
          pageCount: response.data.length / 10
        }, this.changePage);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getResults(this.state.query);
  }

  changePage() {
    let data = this.state.events.slice(this.state.offset, this.state.offset + 10);
    console.log(data);
    this.setState({ data });
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);
    console.log(selected);
    this.setState({ offset: offset }, this.changePage());
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
            <SearchResults results={this.state.data} />
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    )
  }
}