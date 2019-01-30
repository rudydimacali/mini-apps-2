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
  }

  componentDidMount() {
    axios.get('http://localhost:3000/events?q=September')
      .then((response) => {
        this.setState({
          events: response.data
        });
      });
  }

  render() {
    return (
      <div>
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