import React from 'react';
import SearchResults from './searchResults.jsx';
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
        <form>
          <input id='query' onChange={this.handleChange}></input>
          <button id='submit' onClick={this.handleSubmit}>Search</button>
        </form>
        <table>
          <tbody>
            <tr>
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