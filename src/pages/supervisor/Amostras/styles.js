import styled from 'styled-components';
import { Color } from '../../../styles/global';

export const Container = styled.div`
  .MuiTableRow-root.Mui-selected, .MuiTableRow-root.Mui-selected:hover {
    background-color: rgba( 25, 138, 227, 0.08 );
  }

  .MuiPaper-elevation1 {
    background-color: rgba( 25, 138, 227, 0.08 );

    .MuiTypography-root {
      color: #3e4b5b;
    }
  }

  .hiUiuO .MuiCheckbox-colorPrimary.Mui-checked {
    color: ${ Color.info };
  }
`;
