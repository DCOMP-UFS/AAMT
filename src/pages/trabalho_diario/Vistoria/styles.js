import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h4 {
    margin: 0;
  }
`;
