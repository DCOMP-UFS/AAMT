import styled from 'styled-components';

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
  border_light: "rgba(0,0,0,.125)"
}

export const ContainerBody = styled.div`
  padding-top: 64px;
  min-height: 100vh;
  display: flex;
`;

export const BodyPanel = styled.div`
  width: calc(100vw - 70px);
  display: flex;
  flex-direction: column;

  &.body-collapse {
    flex: 0.8;
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
  border-top: 1px solid ${ Color.dark };
`;

const select = {
  display: "flex",
  border: "1px solid #ebedf2",
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

export const selectDefault = {
  control: (base, state) => {
    let focused = {};

    state.isFocused ?
      focused = focus :
      focused = {};

    return {
      ...select,
      height: "2.875rem",
      lineHeight: "1",

      ...focused,
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
