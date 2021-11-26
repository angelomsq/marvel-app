import styled from 'styled-components';

export const Container = styled.header`
  background: var(--shape);

  section {
    max-width: 1120px;
    margin: 0 auto;

    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 426px) {
      flex-direction: column;
    }

    div {
      flex: 1;
      max-width: 60%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (max-width: 720px) {
        flex-direction: column;
        align-items: flex-end;
      }

      h2 {
        font-size: 2rem;
        text-transform: uppercase;
        color: #ffffff;
      }

      span {
        font-weight: 300;

        a {
          font-weight: 500;
          transition: all 0.3s;

          &:hover {
            color: var(--blue);
          }
        }
      }
    }
  }
`;
