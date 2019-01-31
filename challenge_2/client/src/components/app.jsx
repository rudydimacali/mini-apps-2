import React from 'react';
import Chart from './chart.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Chart />
    )
  }
}