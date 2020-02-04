import styled from 'styled-components';

import { Color } from '../../styles/global';

export const Container = styled.div`
  /* .MUIDataTableToolbarSelect-root-256 {
    background-color: rgb(255, 226, 236)!important;
    padding-left: 16px!important;
    padding-right: 8px!important;
    border-bottom-right-radius: 0!important;
    border-bottom-left-radius: 0!important;
  }

  .MUIDataTableToolbarSelect-title-257 {
    color: #f50057!important;
    padding: 0!important;
  }

  .MUIDataTableToolbar-icon-48 {
    color: ${ Color.info }!important;
  }
  */
  .MuiCheckbox-colorPrimary.Mui-checked {
    color: #f50057;
  }

  .row-desabled {
    background: ${ Color.danger };
  }

  tr:hover td:first-child {
    background: #EDEDED;
  }

  .row-desabled:hover,
  .row-desabled:hover > td:first-child {
    background: #FE5678!important;
  }

  .row-desabled td:first-child {
    background: ${ Color.danger };
  }

  .row-desabled td:not(:first-child) {
    color: #fff;
  }
`;
