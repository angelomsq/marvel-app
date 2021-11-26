import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { FaTimes, FaRegEdit } from 'react-icons/fa';
import marvelApi from '../../services/marvelApi';

import { Container, Hero, Grid, Form } from './styles';
import { ICharacter } from '../../Utils/interfaces/ICharacter';
import getStoragedCharacters from '../../Utils/getStoragedCharacters';

interface IList {
  name: string;
  resourceURI: string;
}

Modal.setAppElement('#root');

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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputName, setInputName] = useState(character.name);
  const [inputDescription, setInputDescription] = useState(
    character.description,
  );
  const [inputPath, setInputPath] = useState(character.thumbnail.path);

  const handleOpenModal = (): void => {
    setModalIsOpen(true);
  };

  const handleCloseModal = (): void => {
    setModalIsOpen(false);
  };

  const handleEditCharacterSubmit = (event: any): void => {
    event.preventDefault();
    if (!inputName.length || !inputPath.length) return;

    const storagedCharacters = getStoragedCharacters();
    const editedStorageCharacters = storagedCharacters.map(
      (item: ICharacter): ICharacter => {
        if (item.id === Number(characterId)) {
          const edited = {
            id: item.id,
            name: inputName,
            description: inputDescription,
            thumbnail: {
              path: inputPath,
              extension: '',
            },
          };
          setCharacter(edited);
          return edited;
        }
        return item;
      },
    );
    localStorage.setItem(
      '@MarvelChallenge:characters',
      JSON.stringify(editedStorageCharacters),
    );
    handleCloseModal();
  };

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
          img={
            !character.thumbnail.extension.length
              ? `${character.thumbnail.path}`
              : `${character.thumbnail.path}.${character.thumbnail.extension}`
          }
        >
          <button
            type="button"
            onClick={handleOpenModal}
            title="Edit Character"
          >
            <FaRegEdit />
            <span>Edit</span>
          </button>
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
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <Form onSubmit={handleEditCharacterSubmit}>
          <h2>Edit Character</h2>
          <button type="button" onClick={handleCloseModal}>
            <FaTimes size={20} />
          </button>
          <span>Name</span>
          <input
            type="text"
            placeholder="Name"
            value={inputName}
            onChange={e => setInputName(e.target.value)}
          />
          <span>Description</span>
          <input
            type="text"
            placeholder="Description"
            value={inputDescription}
            onChange={e => setInputDescription(e.target.value)}
          />
          <span>Image</span>
          <input
            type="text"
            placeholder="Image Path"
            value={inputPath}
            onChange={e => setInputPath(e.target.value)}
          />

          <button type="submit">Save</button>
        </Form>
      </Modal>
    </Container>
  );
};

export default Character;
