import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSongs, deleteSong } from '../redux/songSlice';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

// Apply global box-sizing
const GlobalStyles = styled.div`
  *, *:before, *:after {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.background};
`;

const Title = styled.h1`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;
  max-width: 100%;
`;

const SearchBar = styled.input`
  padding: ${theme.spacing.sm};
  width: 100%;
  max-width: 400px;
  border: 1px solid ${theme.colors.text};
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SortButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background: darken(${theme.colors.primary}, 10%);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const PaginationButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm};
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background: ${theme.colors.text}50;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background: darken(${theme.colors.primary}, 10%);
  }
`;

const SongListStyled = styled.ul`
  list-style: none;
  padding: ${theme.spacing.lg} 150px;
  max-width: 100%;
  overflow-x: auto;
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 14px;
    padding: ${theme.spacing.lg} 20px;
  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm};
  background: ${theme.colors.primary};
  color: white;
  border: 1px solid ${theme.colors.text}20;
  border-radius: 4px;
  margin-bottom: ${theme.spacing.sm};
  gap: ${theme.spacing.md};
`;

const HeaderColumn = styled.span`
  flex: 1;
  text-align: left;
  font-weight: bold;
  &:last-child {
    flex: 0 0 40px;
  }
`;

const SongRowWrapper = styled.div`
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const SongItem = styled.li`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm};
  background: white;
  margin-bottom: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.text}20;
  border-radius: 4px;
  line-height: 4em;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  gap: ${theme.spacing.md};
`;

const SongData = styled.div`
  display: flex;
  flex: 1;
  gap: ${theme.spacing.md};
  color: ${theme.colors.text};
  ${SongRowWrapper}:hover & {
    color: blue;
  }
`;

const Column = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeleteButton = styled.button`
  background: ${theme.colors.error};
  color: white;
  border: none;
  padding: ${theme.spacing.sm};
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  transition: background 0.2s ease;
  &:hover {
    background: #c0392b;
  }
`;

const AddButton = styled(Link)`
  position: fixed;
  bottom: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: ${theme.colors.primary};
  color: white;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-decoration: none;
  font-size: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    background: darken(${theme.colors.primary}, 10%);
  }
`;

function SongList() {
  const dispatch = useDispatch();
  const { list, count, next, previous, loading, error } = useSelector((state) => state.songs);
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('Fetching songs with:', { page, search, ordering });
    dispatch(fetchSongs({ page, search, ordering }));
  }, [dispatch, page, search, ordering]);

  useEffect(() => {
    console.log('Received songs:', list.map(song => song.title));
  }, [list]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSort = (order) => {
    console.log('Setting sort order:', order);
    setOrdering(order);
    setPage(1);
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSong(id));
    }
  };

  return (
    <GlobalStyles>
      <Container>
        <Title>Song Manager</Title>
        <Header>
          <SearchBar
            type="text"
            placeholder="Search songs"
            value={search}
            onChange={handleSearch}
          />
          <SortButton onClick={() => handleSort('title')}>Sort Title Asc</SortButton>
          <SortButton onClick={() => handleSort('-title')}>Sort Title Desc</SortButton>
        </Header>
        {error && <p>Error: {error}</p>}
        {loading && <p>Loading...</p>}
        <SongListStyled>
          <TableHeader>
            <HeaderColumn>Song</HeaderColumn>
            <HeaderColumn>Artist</HeaderColumn>
            <HeaderColumn>Album</HeaderColumn>
            <HeaderColumn>Year</HeaderColumn>
            <HeaderColumn>Stream</HeaderColumn>
            <HeaderColumn></HeaderColumn>
          </TableHeader>
          {list.map((song) => (
            <Link to={`/edit/${song.id}`} key={song.id} style={{ textDecoration: 'none' }}>
              <SongRowWrapper>
                <SongItem>
                  <SongData>
                    <Column>{song.title}</Column>
                    <Column>{song.artist}</Column>
                    <Column>{song.album}</Column>
                    <Column>{song.year}</Column>
                    <Column>{song.stream}</Column>
                  </SongData>
                  <DeleteButton onClick={(e) => handleDelete(song.id, e)}>🗑️</DeleteButton>
                </SongItem>
              </SongRowWrapper>
            </Link>
          ))}
        </SongListStyled>
        <Pagination>
          <PaginationButton
            onClick={() => setPage(page - 1)}
            disabled={!previous}
          >
            Previous
          </PaginationButton>
          <PaginationButton
            onClick={() => setPage(page + 1)}
            disabled={!next}
          >
            Next
          </PaginationButton>
        </Pagination>
        <AddButton to="/add">+</AddButton>
      </Container>
    </GlobalStyles>
  );
}

export default SongList;