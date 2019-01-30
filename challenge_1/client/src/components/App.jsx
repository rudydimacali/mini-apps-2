import React from 'react';
import SearchResults from './SearchResults.jsx';
const axios = require('axios');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [{
        date: 'Loading...',
        description: '',
      }],
    };
    this.getResults = this.getResults.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getResults('September');
  }

  getResults(queue) {
    axios.get(`http://localhost:3000/events?q=${queue}`)
      .then((response) => {
        this.setState({
          events: response.data
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
    this.getResults(this.state.query);
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <a class="navbar-brand" href="#">Historical Events Finder</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#"><span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"></a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="text" placeholder="Search" id='query' onChange={this.handleChange} />
              <button class="btn btn-secondary my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Search</button>
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
      </div>
    )
  }
}