import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import marvelApi from '../../services/marvelApi';

import { Container, Hero, Grid } from './styles';
import { ICharacter } from '../../Utils/interfaces/ICharacter';
import getStoragedCharacters from '../../Utils/getStoragedCharacters';

interface IList {
  name: string;
  resourceURI: string;
}

const Character: React.FC = () => {
  const { characterId } = useParams();

  const [character, setCharacter] = useState<ICharacter>(() => {
    const storagedCharacters = getStoragedCharacters();
    if (storagedCharacters.length) {
      const filteredCharacters = storagedCharacters.filter(
        item => item.id === Number(characterId),
      );
      return filteredCharacters[0];
    }
    return {} as ICharacter;
  });

  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<IList[]>([]);
  const [events, setEvents] = useState<IList[]>([]);
  const [series, setSeries] = useState<IList[]>([]);

  useEffect(() => {
    async function fetchCharacter(): Promise<void> {
      marvelApi.get(`characters/${characterId}`).then(response => {
        if (!character) setCharacter(response.data.data.results[0]);

        setStories(response.data.data.results[0].stories.items);
        setEvents(response.data.data.results[0].events.items);
        setSeries(response.data.data.results[0].series.items);

        setLoading(false);
      });
    }

    fetchCharacter();
  }, [character, characterId]);
  return (
    <Container>
      <section>
        <header>
          <h1>Character Details</h1>
          <Link to="/">Back to Dashboard</Link>
        </header>
        <Hero
          img={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
        >
          <h1>{character.name}</h1>
          <span>
            {character.description
              ? character.description
              : 'No description available.'}
          </span>

          <Grid>
            <div>
              <h3>Stories</h3>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <ul>
                  {!stories.length ? 'No data.' : ''}
                  {stories.map(item => (
                    <li key={item.resourceURI}>{item.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3>Events</h3>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <ul>
                  {!events.length ? 'No data.' : ''}
                  {events.map(item => (
                    <li key={item.resourceURI}>{item.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3>Series</h3>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <ul>
                  {!series.length ? 'No data.' : ''}
                  {series.map(item => (
                    <li key={item.resourceURI}>{item.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </Grid>
        </Hero>
        {/* <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        /> */}
      </section>
    </Container>
  );
};

export default Character;
