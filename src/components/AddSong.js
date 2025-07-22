import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSong } from '../redux/songSlice';
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

function AddSong() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    stream: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSong({ ...formData, year: Number(formData.year), stream: Number(formData.stream) }));
    navigate('/');
  };

  return (
    <FormContainer>
      <h2>Add Song</h2>
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
        <Button type="submit">Add Song</Button>
      </Form>
    </FormContainer>
  );
}

export default AddSong;