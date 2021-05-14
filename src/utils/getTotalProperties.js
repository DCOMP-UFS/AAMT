import { useSelector } from 'react-redux';

export default function getTotalProperties() {
  let totalLength = 0;
  const routes = useSelector(state => state.currentActivity.routes);

  routes.map(route => {
    route.lados.map(lado => {
      totalLength += lado.imoveis.length;
    });
  });

  return totalLength;
}
