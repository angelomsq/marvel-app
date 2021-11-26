import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --red: #E23636;
    --red-medium: #ED2324;
    --blue: #518CCA;
    --blue-medium: #626EDA;
    --blue-light: #CCF4FE;
    --yellow: #F78F3F;
    --yellow-medium: #EFA53A;
    --purple: #924F9E;
    --purple-dark: #361a29;
    --black: #333333;
    --grey: #504A4A;

    --background: #2B2F37;
    --text-title: #363f5f;
    --text-body: #969cb3;
    --shape: #343641;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
    color: #FFFFFF;
  }

  body, input, textarea, button {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  h1 {
    font-size: 2rem;
    line-height: 3rem;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  a {
    font-weight: 500;
    text-decoration: none;
    color: #FFFFFF;

    &:hover {
      color: var(--gray);
    }
  }

  .modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    width: 100%;
    max-width: 570px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    margin: 0 1rem;
  }

`;
