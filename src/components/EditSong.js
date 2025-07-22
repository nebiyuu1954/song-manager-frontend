import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSong } from '../redux/songSlice';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const FormContainer = styled.div`
  max-width: 400px;
  margin: ${theme.spacing.lg} auto;
  padding: ${theme.spacing.md};
  background: ${theme.colors.background};
  border-radius: 4px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const Input = styled.input`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.text};
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing.sm};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: darken(${theme.colors.primary}, 10%);
  }
`;

function EditSong() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const song = useSelector((state) => state.songs.list.find((s) => s.id === Number(id)));

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    stream: '',
  });

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title,
        artist: song.artist,
        album: song.album,
        year: song.year.toString(),
        stream: song.stream.toString(),
      });
    }
  }, [song]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSong({ id: Number(id), updatedSong: { ...formData, year: Number(formData.year), stream: Number(formData.stream) } }));
    navigate('/');
  };

  if (!song) return <p>Song not found</p>;

  return (
    <FormContainer>
      <h2>Edit Song</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <Input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          placeholder="Artist"
          required
        />
        <Input
          type="text"
          name="album"
          value={formData.album}
          onChange={handleChange}
          placeholder="Album"
          required
        />
        <Input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
          required
        />
        <Input
          type="number"
          name="stream"
          value={formData.stream}
          onChange={handleChange}
          placeholder="Stream Count"
          required
        />
        <Button type="submit">Update Song</Button>
      </Form>
    </FormContainer>
  );
}

export default EditSong;