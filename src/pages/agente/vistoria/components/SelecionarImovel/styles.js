import styled from 'styled-components';
import { Color } from '../../../../../styles/global';

export const Container = styled.div`
  .MuiPaper-root {
    box-shadow: none;
  }

  tr.MuiTableRow-root.selected {
    background: ${ Color.info }
  }
`;
