import React from 'react';
import logo from '../../assets/marvel-logo.png';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <section>
        <img src={logo} alt="Marvel Comics" />
        <div>
          <h2>Characters</h2>
          <span>
            Made by{' '}
            <a
              href="https://github.com/angelomsq"
              target="_blank"
              rel="noreferrer"
            >
              Angelo Queiroz
            </a>
          </span>
        </div>
      </section>
    </Container>
  );
};

export default Header;
