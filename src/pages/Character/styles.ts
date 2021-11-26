import styled from 'styled-components';

export const Container = styled.div`
  section {
    max-width: 1120px;
    margin: 0 auto;

    padding: 1rem;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin: 1rem 0;

      @media (max-width: 720px) {
        flex-direction: column;
      }

      a {
        margin: 0 1rem;
        padding: 0.1rem 0.5rem;
        border: 0;
        color: #ffffff;
        background: var(--red);

        &:hover {
          background: var(--red-medium);
        }
      }
    }
  }
`;

interface HeroProps {
  img: string;
}

export const Hero = styled.div<HeroProps>`
  min-height: 60vh;
  background: var(--shape) url(${({ img }) => img}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;

  padding: 3rem;

  @media (max-width: 1080px) {
    padding: 2rem;
  }

  h1 {
    margin: 0 0 1rem 0;
    text-shadow: 1px 2px 15px var(--background);
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  margin: 5rem 0 0 0;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 3rem;
  }

  div {
    background: rgb(52 54 65 / 80%);
    padding: 1rem;
    border-radius: 1rem;

    &:hover {
      background: rgb(52 54 65 / 90%);
    }

    h3 {
      font-size: 2.5rem;
      margin-top: -3.5rem;
      font-family: 'Pacifico', cursive;
    }

    ul {
      list-style: none;

      @media (max-width: 720px) {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 426px) {
        display: grid;
        gap: 0;
        grid-template-columns: repeat(1, 1fr);
      }

      li {
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.5rem 0;

        &:hover {
          font-weight: 600;
        }
      }
    }
  }
`;
