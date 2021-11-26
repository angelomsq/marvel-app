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
    }

    nav {
      margin-bottom: 1rem;

      @media (max-width: 720px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button {
        margin: 0 1rem;
        padding: 0.1rem 0.5rem;
        border: 0;
        color: #ffffff;
        background: var(--red);
      }
    }

    ul {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 1rem;
      list-style: none;

      li {
        a {
          background: var(--shape);
          margin: 0.3rem;
          padding: 0.5rem 1rem;
          cursor: pointer;

          @media (max-width: 426px) {
            margin: 0.2rem;
            padding: 0.3rem 0.8rem;
          }

          &:hover {
            background: var(--red);
          }
        }

        &.active-btn {
          a {
            background: var(--red-medium);
          }
        }
      }
    }
  }
`;

export const Search = styled.form`
  display: flex;

  input {
    padding: 10px 15px;
    outline: 0;
    border: 0;
    background: var(--shape);
    color: #ffffff;

    &:focus {
      border: 1px solid var(--red);
    }
  }

  button {
    background: var(--red);
    color: var(--gray);
    border: 0;
    padding: 10px;
    font-size: 1rem;
    font-weight: 500;
    line-height: 0.5rem;

    &:hover {
      background: var(--red-medium);
    }
  }
`;

export const Loader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;

  svg {
    margin-bottom: 2rem;
  }
  span {
    font-weight: 600;
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 426px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Box = styled.div`
  background: var(--shape);
  padding: 0.5rem;
  display: flex;
  margin: 0;
  /* flex-direction: column; */
  align-items: center;
  /* justify-content: center; */
  transition: all 0.5s;

  img {
    border-radius: 50%;
    display: block;
    margin-right: 0.5rem;
    border: 6px solid var(--background);
    /* border-right: 6px solid var(--red); */
    /* border-left: 1px solid var(--red); */
    /* border-bottom: 1px solid var(--red); */
    transition: all 0.5s;
  }

  &:hover {
    background: var(--red);

    img {
      border-color: var(--black);
      transform: rotate(-10deg);
    }

    span {
      /* color: var(--blue); */
    }
  }
`;
