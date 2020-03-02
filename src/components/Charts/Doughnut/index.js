import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { generateColor } from '../support';

export default class DoughnutChart extends Component {
  render() {
    let data = this.props.data;

    const chartColor = generateColor( data.datasets[0].data.length );

    data.datasets = data.datasets
      .map( (dataset, index) => {
        let backgroundColor = [];
        let borderColor = [];

        if( !dataset.backgroundColor ){
         backgroundColor = chartColor.map( c => c[0]);
         borderColor = chartColor.map( c => c[1]);
        } else {
          backgroundColor = dataset.backgroundColor;
          borderColor = dataset.borderColor;
        }

        return {
          ...dataset,
          backgroundColor,
          borderColor
        }
      });

    return (
      <Doughnut ref="chart" data={data} />
    );
  }
}
