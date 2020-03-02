import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

import { generateColor } from '../support';

const configChart = {
  fill: false,
  lineTension: 0.1,
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
};

export default class PieChart extends Component {
  render() {
    let data = this.props.data;

    // const chartColor = generateColor( data.datasets[0].data.length );

    data.datasets = data.datasets
      .map( (dataset, index) => {
        return {
          ...dataset,
          ...configChart,
          // backgroundColor: chartColor[ (index % data.datasets.length ) ],
          // borderColor: chartColor[ (index % data.datasets.length ) ]
        }
      });

    return (
      <Pie ref="chart" data={data} />
    );
  }
}
