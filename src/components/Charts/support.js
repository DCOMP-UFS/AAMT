import { Color } from '../../styles/global';

export const generateColor = number => {
  const max = Color.chartColor.length;
  const min = 0;

  let dataColor = [];
  for(var i = 0; i < number; i++) {
    let color = Math.floor(Math.random() * (+max - +min)) + +min;

    dataColor.push( Color.chartColor[color] );
  }

  return dataColor
}
