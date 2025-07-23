import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SongList from '../components/SongList';
import { theme } from '../styles/theme';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';

//create a mock Redux store to mock the state 
const mockStore = configureStore([]);

describe('SongList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      songs: {
        list: [
          { id: 1, title: 'Song One', artist: 'Artist One', album: 'Album One', year: 2020, stream: 1000000 },
          { id: 2, title: 'Song Two', artist: 'Artist Two', album: 'Album Two', year: 2021, stream: 2000000 },
        ],
        count: 2,
        next: null,
        previous: null,
        loading: false,
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  it('renders SongList component with title, search bar, sort buttons, and table headers', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <SongList />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    //check main title
    expect(screen.getByText('Song Manager')).toBeInTheDocument();

    //check search bar
    expect(screen.getByPlaceholderText('Search songs')).toBeInTheDocument();

    //check sort buttons
    expect(screen.getByText('Sort Title Asc')).toBeInTheDocument();
    expect(screen.getByText('Sort Title Desc')).toBeInTheDocument();

    //check table headers
    expect(screen.getByText('Song')).toBeInTheDocument();
    expect(screen.getByText('Artist')).toBeInTheDocument();
    expect(screen.getByText('Album')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Stream')).toBeInTheDocument();

    //check song data
    expect(screen.getByText('Song One')).toBeInTheDocument();
    expect(screen.getByText('Artist One')).toBeInTheDocument();
    expect(screen.getByText('Song Two')).toBeInTheDocument();
    expect(screen.getByText('Artist Two')).toBeInTheDocument();

    //check pagination buttons
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});