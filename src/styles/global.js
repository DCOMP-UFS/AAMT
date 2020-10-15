import styled, { createGlobalStyle } from 'styled-components';

export const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  laptop: '1024px',
  tablet: '990px',
  laptopL: '1440px',
  desktop: '2560px',
}

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
};

export const Color = {
  primary: "#b66dff",
  warning: "#ffc542",
  success: "#1bcfb4",
  danger: "#fe7c96",
  info: "#198ae3",
  light: "#f8f9fa",
  secondary: "#c3bdbd",
  dark: "#3e4b5b",
  muted: "#9c9fa6",
  bgLight: "#FCFCFC",
  border_light: "#ebedf2",
  border_input: "#cccccc",
  shadow_light: "#c5baba",
  icon_page: "#31373B",
  chartColor: [
    [ 'rgba(182, 109, 255, 0.2)', 'rgba(182, 109, 255, 1)' ],
    [ 'rgba(255, 197, 66, 0.2)', 'rgba(255, 197, 66, 1)' ],
    [ 'rgba(27, 207, 180, 0.2)', 'rgba(27, 207, 180, 1)' ],
    [ 'rgba(254, 124, 150, 0.2)', 'rgba(254, 124, 150, 1)' ],
    [ 'rgba(25, 138, 227, 0.2)', 'rgba(25, 138, 227, 1)' ],
    [ 'rgba(195, 189, 189, 0.2)', 'rgba(195, 189, 189, 1)' ],
    [ 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)' ]
  ]
}

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ubuntu-light';
    src: url('./assets/fonts/Ubuntu-Light.ttf')  format('truetype'), /* Safari, Android, iOS */
  }
  @font-face {
    font-family: 'ubuntu-regular';
    src: url('./assets/fonts/Ubuntu-Regular.ttf')  format('truetype'), /* Safari, Android, iOS */
  }
  @font-face {
    font-family: 'ubuntu-medium';
    src: url('./assets/fonts/Ubuntu-Medium.ttf'); /* Safari, Android, iOS */
  }
  @font-face {
    font-family: 'ubuntu-bold';
    src: url('./assets/fonts/Ubuntu-Bold.ttf'); /* Safari, Android, iOS */
  }

  @font-face {
    font-family: 'material-icons';
    font-style: normal;
    font-weight: 400;
    src: local('Material Icons'),
      local('MaterialIcons-Regular'),
      url('../node_modules/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.woff2') format('woff2'),
      url('../node_modules/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.woff') format('woff'),
      url('../node_modules/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.ttf') format('truetype');
  }

  [class^="MUIDataTable-responsiveScroll"] {
    z-index: 0;
  }

  .Toastify__toast {
    border-radius: 3px!important;
  }

  .Toastify__toast--success {
    background: ${ Color.success }!important;
  }

  .Toastify__toast--warning {
    background: ${ Color.warning }!important;
  }

  .Toastify__progress-bar--default {
    background: ${ Color.dark }!important;
  }

  .expansion {
    border: 1px solid #cccccc;
    border-radius: 0.1875rem!important;
    box-shadow: none!important;
  }

  .expansion::before {
    display: none;
  }

  .pt-40 {
    padding-top: 40px!important;
  }
  .pr-40 {
    padding-right: 40px!important;
  }
  .pb-40 {
    padding-bottom: 40px!important;
  }
  .pl-20 {
    padding-left: 20px!important;
  }

  .pt-20 {
    padding-top: 20px!important;
  }
  .pr-20 {
    padding-right: 20px!important;
  }
  .pb-20 {
    padding-bottom: 20px!important;
  }
  .pl-20 {
    padding-left: 20px!important;
  }

  .border-top-temp {
    border-top: 1px solid ${ Color.border_input }!important;
  }
  .border-right-temp {
    border-right: 1px solid ${ Color.border_input }!important;
  }
  .border-bottom-temp {
    border-bottom: 1px solid ${ Color.border_input }!important;
  }
  .border-left-temp {
    border-left: 1px solid ${ Color.border_input }!important;
  }

  .nav-page {
    margin-bottom: 20px!important;
    border-bottom: 0!important;

    .nav-item {
      color: ${ Color.secondary };
      padding: 10px 20px;
      font-weight: bold;
      background: transparent!important;
      border-top-color: transparent!important;
      border-right-color: transparent!important;
      border-left-color: transparent!important;
      border-bottom: 2px solid #e3e5ef!important;

      &.active {
        border-bottom: 2px solid ${ Color.success }!important;
      }

      &.disabled {
        color: ${ Color.secondary }!important;
        cursor: not-allowed;
        pointer-events: auto;
      }
    }
  }
`;

export const ContainerBody = styled.div`
  padding-top: 64px;
  min-height: 100vh;
  display: flex;
`;

export const BodyPanel = styled.div`
  padding: 40px 30px;

  @media (max-width: 990px) {
    width: 100%;
  }

  @media (min-width: 991px) {
    width: calc(100vw - 70px);
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease-out;

    &.body-collapse {
      width: calc(100vw - 260px);
    }
  }
`;

const basicButton = styled.button`
  min-width: 150px;
  box-shadow: none;
  display: inline-block;
  font-family: "ubuntu-bold", sans-serif;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.875rem 2.5rem;
  font-size: 0.875rem;
  line-height: 1;
  border-radius: 0.1875rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const Button = styled(basicButton)`
  /* <PRIMARY> */
  color: #FFF;
  background-color: ${ Color.primary };
  border-color: ${ Color.primary }!important;
  /* padding: 8.35px 0; */
  ${ props => props.loading === 'true' ? 'padding: 8.35px;' : '' }

  &:hover {
    background-color: #9D3AFF!important;
    border-color: #9D3AFF!important;
  }

  &:focus{
    box-shadow: 0 0 0 0.2rem #ca9ff5!important;
  }

  &:disabled {
    color: #FFF;
    background-color: ${ Color.primary }!important;
    border-color: ${ Color.primary }!important;
  }
  /* </PRIMARY> */

  /* <SECONDARY> */
  &.secondary {
    color: #FFF;
    background-color: ${ Color.secondary };
    border-color: ${ Color.secondary }!important;
  }

  &.secondary:hover {
    color: #FFF;
    background-color: #ABA2A2!important;
    border-color: #ABA2A2!important;
  }

  &.secondary:focus {
    box-shadow: 0 0 0 0.2rem #E2DEDE!important;
  }

  &.secondary:disabled {
    color: #FFF;
    background-color: ${ Color.secondary }!important;
    border-color: ${ Color.secondary }!important;
  }
  /* </SECONDARY> */

  /* <SUCCESS> */
  &.success {
    color: #FFF;
    background-color: ${ Color.success };
    border-color: ${ Color.success }!important;
  }

  &.success:hover {
    background-color: #16A993!important;
    border-color: #16A993!important;
  }

  &.success:focus {
    box-shadow: 0 0 0 0.2rem #b1ece3!important;
  }

  &.success:disabled {
    color: #FFF;
    background-color: ${ Color.success }!important;
    border-color: ${ Color.success }!important;
  }
  /* </SUCCESS> */
  /* <DANGER> */
  &.danger {
    color: #FFF;
    background-color: ${ Color.danger };
    border-color: ${ Color.danger }!important;
  }

  &.danger:hover {
    background-color: #FE5678!important;
    border-color: #FE5678!important;
  }

  &.danger:focus {
    box-shadow: 0 0 0 0.2rem #fabfcb!important;
  }

  &.danger:disabled {
    color: #FFF;
    background-color: ${ Color.danger }!important;
    border-color: ${ Color.danger }!important;
  }
  /* </DANGER> */
  /* <WARNING> */
  &.warning {
    color: #FFF;
    background-color: ${ Color.warning };
    border-color: ${ Color.warning }!important;
  }

  &.warning:hover {
    background-color: #EAC301!important;
    border-color: #EAC301!important;
  }

  &.warning:focus {
    box-shadow: 0 0 0 0.2rem #EEDD8A!important;
  }

  &.warning:disabled {
    color: #FFF;
    background-color: ${ Color.danger }!important;
    border-color: ${ Color.danger }!important;
  }
  /* </WARNING> */

  & .btn-icon {
    margin-right: 10px;
  }

  &.btn-small {
    padding: 8px 15px;
    min-width: auto;
    display: flex;
  }
`;

export const ButtonInverse = styled(basicButton)`

  /* <Danger> */
  &.danger {
    background-color: rgba(254, 124, 150, 0.2);
    background-image: none;
    border-color: rgba(254, 124, 150, 0)!important;
  }

  &.danger:hover {
    background: ${ Color.danger };
    color: #fff!important;
  }

  &.danger:focus, &.danger.focus {
    box-shadow: 0 0 0 0.2rem rgba(254, 124, 150, 0.2)!important;
  }

  &.danger:not(:disabled):not(.disabled):active:focus,
  &.danger:not(:disabled):not(.disabled).active:focus {
    box-shadow: 0 0 0 0.2rem rgba(254, 124, 150, 0.2)!important;
  }

  &.danger:not(.btn-inverse-light) {
    color: ${ Color.danger };
  }
  /* </Danger> */

`;

export const CardBody = styled.article`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: stretch;
  align-items: stretch;
  -ms-flex-pack: stretch;
  justify-content: stretch;

  .c-container {
    background: #fff;
    border-radius: 5px;
    padding: 40px;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    border: 1px solid ${ Color.border_light };
  }

  .c-header .title.center {
    text-align: center;
  }
`;

export const InfoGroup = styled.div`
  margin-bottom: 0.5rem;

  label {
    font-weight: bold;
    font-size: 0.875rem;
    line-height: 1;
    vertical-align: top;
    margin-bottom: .5rem;
  }
`;

export const Separator = styled.div`
  width: calc(100% - 40px);
  padding: 10px 10px;
  margin: auto;
  border-top: ${props => props.sizeBorder ? props.sizeBorder : "1px" } solid ${ Color.dark };
`;

const select = {
  display: "flex",
  border: `1px solid ${ Color.border_input }`,
  fontFamily: "\"ubuntu-regular\", sans-serif",
  fontSize: "0.8125rem",
  boxShadow: "none",
  width: "100%",
  paddingLeft: "0.81rem",
  fontWeight: "400",
  color: "#495057",
  backgroundColor: "#ffffff",
  backgroundClip: "padding-box",
  borderRadius: "2px",
  transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
}

const focus = {
  border: "1px solid #198ae3",
  boxShadow: "0 0 3px #719ECE",
  outline: "none",
  outlineStyle: "none",
}

const disable = {
  backgroundColor: "#E9ECEF"
}

export const selectDefault = {
  control: (base, state) => {
    let focused = {};
    let disabled = {};

    state.isFocused ?
      focused = focus :
      focused = {};

    state.isDisabled ?
      disabled = disable :
      disabled = {};

    return {
      ...select,
      height: "2.875rem",

      ...focused,
      ...disabled
    }
  },
}

export const selectLg = {
  control: (base, state) => {
    let focused = {};

    state.isFocused ?
      focused = focus :
      focused = {};

    return {
      ...select,
      height: "3.175rem",
      lineHeight: "1.5",

      ...focused,
    }
  },
}

export const selectSm = {
  control: (base, state) => {
    let focused = {};

    state.isFocused ?
      focused = focus :
      focused = {};

    return {
      ...select,
      height: "2.575rem",
      lineHeight: "1.5",

      ...focused,
    }
  },
}

export const UlIcon = styled.ul`
  border: 1px solid ${ Color.border_input };
  list-style: none;
  padding: 0;
  max-height: 484px;
  overflow-y: auto;
`;

export const LiIcon = styled.li`
  display: flex;
  cursor: pointer;
  padding: 0.375rem 0 0.375rem 1.375rem;
  align-items: center;
  /* flex-direction: column; */

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  &:hover {
    background: ${ Color.bgLight };
  }
`;

export const ContainerIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 25px;
  height: 25px;
  padding: 0.375rem 0.375rem;
  color: #fff;
  background: ${ Color.primary };
`;

export const DivDescription = styled.div`
  padding: 0.375rem 1.375rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    color: #343a40;
  }

  @media ${ device.tablet } {
    & div:first-child {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

export const LiEmpty = styled.li`
  padding: 0.375rem 1.375rem;
  text-align: center;

  h4 {
    margin: 0!important;
    color: ${ Color.muted };
  }
`;

export const CardDark = styled.div`
  background: ${ Color.dark };
  border-radius: 5px;
  padding: 40px;
  width: 100%;

  .title{
    color: ${ Color.light };
    margin-bottom: 0.75rem;
    text-transform: capitalize;
    font-family: "ubuntu-medium", sans-serif;
    font-size: 1.125rem;
    border-top: 0;
  }

  .text-description{
    color: #76838f;
    margin-bottom: 1.5rem;
    font-family: "ubuntu-regular", sans-serif;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &.inline {
    display: flex;
    align-items: center;
  }

  &.inline label {
    flex: 1;
    max-width: 125px;
    margin: 0;
  }

  &.inline .form-control, &.inline div[class$="container"] {
    flex: 3;
  }

  &.form-dark label {
    color: #fff;
  }

  &.form-dark .form-control {
    background: #2e3844;
    border: 2px solid ${ Color.dark };
    color: #fff;
  }

  &.form-dark .form-control:focus,
  &.form-dark input:focus,
  &.form-dark select:focus,
  &.form-dark textarea:focus,
  &.form-dark button:focus,
  &.form-dark .form-control .MuiInput-input:focus {
    border: 2px solid #198ae3;
    box-shadow: 0 0 3px #719ECE;
    outline: none;
    outline-style: none;
  }

  .form-control:focus,
  input:focus,
  select:focus,
  textarea:focus,
  button:focus,
  .form-control .MuiInput-input:focus {
    border: 1px solid #198ae3;
    box-shadow: 0 0 3px #719ECE;
    outline: none;
    outline-style: none;
  }


  label {
    font-size: 0.875rem;
    line-height: 1;
    margin-bottom: .5rem;
    display: block;
  }

  .form-control:not(textarea) {
    height: 2.875rem;
  }

  .form-control {
    border: 1px solid ${ Color.border_input };
    font-family: "ubuntu-regular", sans-serif;
    font-size: 0.8125rem;
    box-shadow: none;
    display: block;
    width: 100%;
    padding-left: 0.81rem;
    font-weight: 400;
    line-height: 1;
    color: #495057;
    background-color: #ffffff;
    background-clip: padding-box;
    border-radius: 2px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .form-control .MuiInput-input {
    border: 1px solid ${ Color.border_input } !important;
    font-family: "ubuntu-regular", sans-serif!important;
    font-size: 0.8125rem!important;
    box-shadow: none!important;
    display: block!important;
    width: 100%!important;
    height: 2.875rem!important;
    padding-left: 0.81rem!important;
    font-weight: 400!important;
    line-height: 1!important;
    color: #495057!important;
    background-color: #ffffff!important;
    background-clip: padding-box!important;
    border-radius: 2px!important;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out!important;
    box-sizing: inherit!important;
  }

  .MuiFormControlLabel-root {
    display: flex;
    align-items: center;
  }

  .form-control.invalid,
  .invalid .css-cenuji-Control {
    border: 1px solid #fe7c96;
  }
`;
