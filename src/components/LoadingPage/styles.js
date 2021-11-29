import styled from 'styled-components/native';

import Loading from '../../components/Loading';

export const LoadingContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const LoadingComponent = styled(Loading).attrs({})``;
