import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';
import SongList from './SongList';
import AddSong from './AddSong';
import EditSong from './EditSong';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/add" element={<AddSong />} />
        <Route path="/edit/:id" element={<EditSong />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;