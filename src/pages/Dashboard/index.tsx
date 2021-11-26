import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FaSearch } from 'react-icons/fa';
import { ThreeDots } from 'react-loading-icons';
import { Container, Search, Loader, Grid, Box } from './styles';

import getStoragedCharacters from '../../Utils/getStoragedCharacters';
import { ICharacter } from '../../Utils/interfaces/ICharacter';

import marvelApi from '../../services/marvelApi';

const Dashboard: React.FC = () => {
  // Marvel API constants (params)
  const limit = 100;
  const [offset, setOffset] = useState(0);

  // Loading and Message constants
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Pagination configuration constants
  const itemsPerPage = 20;
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);

  // Character and Total constants
  const [characters, setCharacters] = useState<ICharacter[]>(() => {
    const storagedCharacters = getStoragedCharacters();
    if (storagedCharacters.length)
      return storagedCharacters.slice(0, itemsPerPage);
    return [];
  });
  const [total, setTotal] = useState(() => {
    const storagedCharacters = getStoragedCharacters();
    return storagedCharacters.length;
  });

  // Search and filter constants
  const [searchText, setSearchText] = useState('');
  const [filtered, setFiltered] = useState<ICharacter[]>([]);

  // FETCH ALL CHARACTERS AND ADD TO LOCAL STORAGE
  useEffect(() => {
    async function fetchCharacters(): Promise<void> {
      marvelApi
        .get('characters', { params: { limit, offset } })
        .then(response => {
          const storagedCharacters = getStoragedCharacters();

          if (storagedCharacters.length !== response.data.data.total) {
            const result = response.data.data.results.map(
              (item: ICharacter): ICharacter => ({
                id: item.id,
                name: item.name,
                description: item.description,
                thumbnail: item.thumbnail,
              }),
            );

            const { count } = response.data.data;
            setMessage(
              `Loading Marvel Characters: [${offset + count}/${
                response.data.data.total
              }]`,
            );

            localStorage.setItem(
              '@MarvelChallenge:characters',
              JSON.stringify([...storagedCharacters, ...result]),
            );

            if (count !== 0) setOffset(offset + count);
          } else {
            setTotal(storagedCharacters.length);
            setPageCount(Math.ceil(storagedCharacters.length / itemsPerPage));
            setLoading(false);
          }
        });
    }
    fetchCharacters();
  }, [limit, offset]);

  // SET ITEMS TO NEW PAGE
  useEffect(() => {
    const endPageOffset = pageOffset + itemsPerPage;

    if (filtered.length) {
      setCharacters(filtered.slice(pageOffset, endPageOffset));
    } else {
      const storagedCharacters = getStoragedCharacters();
      if (storagedCharacters.length) {
        setCharacters(storagedCharacters.slice(pageOffset, endPageOffset));
      }
    }
    setPageCount(Math.ceil(total / itemsPerPage));
  }, [pageOffset, itemsPerPage, total, filtered]);

  // HANDLE PAGE CHANGES
  const handlePaginateClick = ({ selected }: any): void => {
    setPageNumber(selected);
    const newOffset = (selected * itemsPerPage) % total;
    setPageOffset(newOffset);
  };

  const handleSearch = (event: any): void => {
    event.preventDefault();
    if (searchText === '' && !filtered.length) return;

    const storagedCharacters = getStoragedCharacters();
    if (storagedCharacters.length === 0) return;

    if (searchText === '' && filtered.length) {
      setPageOffset(0);
      setFiltered([]);
      setTotal(storagedCharacters.length);
      setPageNumber(0);
    } else {
      const searchResults = storagedCharacters.filter(item =>
        item.name.toLowerCase().includes(searchText),
      );

      setPageOffset(0);
      setFiltered(searchResults);
      setTotal(searchResults.length);
      setPageNumber(0);
    }
  };

  const handleResetSearch = (): void => {
    const storagedCharacters = getStoragedCharacters();
    if (storagedCharacters.length === 0) return;

    setPageOffset(0);
    setFiltered([]);
    setTotal(storagedCharacters.length);
    setPageNumber(0);
    setSearchText('');
  };

  return (
    <Container>
      <section>
        <header>
          <h1>Dashboard</h1>
          <Search onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <button type="submit">
              <FaSearch size={20} />
            </button>
          </Search>
        </header>

        {!!filtered.length && (
          <nav>
            <span>Search by: {searchText}</span>{' '}
            <button type="button" onClick={handleResetSearch}>
              reset
            </button>
          </nav>
        )}

        {loading ? (
          <Loader>
            <ThreeDots />
            <span>{message}</span>
          </Loader>
        ) : (
          <>
            <Grid>
              {characters.map(item => (
                <Link key={item.id} to={`character/${item.id}`}>
                  <Box>
                    <img
                      src={`${item.thumbnail.path}/standard_medium.${item.thumbnail.extension}`}
                      alt={item.name}
                    />
                    <span>{item.name}</span>
                  </Box>
                </Link>
              ))}
            </Grid>
            {characters.length ? (
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePaginateClick}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                forcePage={pageNumber}
                previousLabel="<"
                marginPagesDisplayed={1}
                containerClassName="paginate-btn"
                previousLinkClassName="prev-btn"
                nextLinkClassName="next-btn"
                activeClassName="active-btn"
              />
            ) : (
              <h3>No characters found!</h3>
            )}
          </>
        )}
      </section>
    </Container>
  );
};

export default Dashboard;
