import React from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Search from './search.jsx';

const moment = require('moment');

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: 'BitCoin Price Data',
      data: {
        labels: ['Loading...'],
        datasets: [
          {
            label: 'USD Per BitCoin',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0]
          }
        ]
      }
    }
    this.getBpi = this.getBpi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getBpi('2019-01-01');
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let testDate = moment(this.state.startDate);
    if (!testDate.isValid() || testDate.isBefore(moment('2010-07-17')) || testDate.isAfter(moment())) {
      alert(`Please enter a valid date between 2010-07-17 and ${moment().format('YYYY-MM-DD')} in the format YYYY-MM-DD.`);
    } else {
      this.getBpi(this.state.startDate);
    }
  }

  getBpi(startDate) {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json', {
      params: {
        start: startDate,
        end: moment(startDate, "YYYY-MM-DD").add(10, 'days').format('YYYY-MM-DD')
      }
    }).then((response) => {
      this.setState({
        data: {
          labels: Object.keys(response.data.bpi),
          datasets: [
            {
              label: 'USD Per BitCoin',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: Object.values(response.data.bpi)
            }
          ]
        }
      })
    });
  }

  render() {
    return (
      <div id='appContainer'>
        <Line data={this.state.data} />
        <h3>Powered By <a href="https://www.coindesk.com/price/">CoinDesk</a></h3>
        <Search handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
};