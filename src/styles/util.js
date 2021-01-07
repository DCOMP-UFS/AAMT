import styled from 'styled-components';
import { Color, device } from './global';

export const ContainerFixed = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 1;
`;

export const ContainerArrow = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  div button:first-child {
    margin-right: 4px;
  }

  div button:not(:first-child) {
    margin-right: 4px;
  }

  div button:not(:last-child) {
    margin-left: 4px;
  }

  div button:last-child {
    margin-left: 4px;
  }
`;

export const InfoGroup = styled.div`
  label {
    font-weight: bold;
  }
`;

export const UlIcon = styled.ul`
  border: 1px solid ${ Color.border_input };
  flex: 1;
  list-style: none;
  padding: 0;
  max-height: 484px;
  overflow-y: auto;

  &.list-hover {
    li:hover {
      background-color: ${ Color.border_light };
    }
  }
`;

export const LiIcon = styled.li`
  display: flex;
  align-items: center;
  padding-right: 0.375rem;
  cursor: pointer;
  /* flex-direction: column; */

  &:not(:last-child) {
    border-bottom: 1px solid ${ Color.border_input };
  }

  &:hover {
    background: ${ Color.light };
  }

  &.active .ContainerIcon {
    background: ${ Color.success };
  }

  div {
    display: flex;
    align-items: center;
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

export const ContainerUl = styled.div`
  flex: 1;
  padding: 0.375rem 0 0.375rem 1.375rem;
`;

export const ContainerIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 35px;
  height: 35px;
  padding: 0.375rem 0.375rem;
  color: #fff;
  background: ${ Color.primary };
`;

export const DivDescription = styled.div`
  padding: 0.375rem 1.375rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

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

export const Span = styled.span`
  @media ${ device.tablet } {
    display: none;
  }
`;

export const PagePopUp = styled.article`
  display: flex;
  align-items: stretch;
  justify-content: stretch;

  .card {
    background: #fff;
    border-radius: 5px;
    padding: 15px 20px;
    width: 100%;
    box-shadow: 2px 2px 8px #c5baba;
  }
`;

export const PageHeader = styled.div`
  margin: 0 0 30px 0;
  padding: 0 5px;

  .page-title {
    color: ${ Color.dark };
    font-size: 1.125rem;
    margin-bottom: 0;
  }
`;

export const PageIcon = styled.span`
  color: ${ Color.success };
  /* border-radius: .25rem; */
  margin-right: 0.875rem;
  background: ${ Color.success };
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 2px 2px 8px #c5baba;
`;

export const btnLoading = {
  minWidth: 150,
  borderRadius: '50px',
  fontSize: '1rem'
}

export const NumberDash = styled.div`
  text-align: center;

  &.border-r {
    border-right: 1px solid rgba(151, 151, 151, 0.3);
  }

  &.margin-b {
    margin-bottom: 20px;
  }

  .legend {
    color: #a7afb7;
  }
`;

export const InfoBox = styled.div`
  padding: 8px;
  border-radius: 5px;
  box-shadow: 2px 2px 8px #c5baba;
  display: flex;

  .info-box-icon {
    border-radius: .25rem;
    -ms-flex-align: center;
    align-items: center;
    display: -ms-flexbox;
    display: flex;
    font-size: 1.875rem;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    width: 70px;
  }

  .info-box-content {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }

  .info-box-text, .progress-description {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 28px;
  }

  .info-box-number {
    display: block;
    margin-top: .25rem;
    font-weight: 700;
    line-height: 28px;
  }

  .info-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .info-subtitle {
    font-size: 0.9rem;
    opacity: .9;
  }

  &.template-no-icon {
    .info-box-content {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;

      .info-box-number {
        font-weight: bold;
        font-size: 1.8rem;
        margin-top: 0;
        line-height: inherit;
      }

      .content-right {
        display: flex;
        align-items: center;
      }
    }
  }
`;
