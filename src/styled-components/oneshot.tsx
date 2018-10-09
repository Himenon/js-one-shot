import * as React from 'react';
import styled, { injectGlobal, keyframes } from 'styled-components';

export const createExample = () => {
  // @ts-ignore
  const _ = injectGlobal`
  body {
    font-family: sans-serif;
  }
  `;

  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
    animation: ${keyframes`from { opacity: 0; }`} 1s both;
  `;

  const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
  `;

  return class Example extends React.Component {
    public render() {
      return (
        <Wrapper>
          <Title>Hello World, this is my first styled component!</Title>
        </Wrapper>
      );
    }
  };
};
