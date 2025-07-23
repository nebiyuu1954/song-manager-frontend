
# Song Manager Frontend

A React app for managing songs with pagination, search, sort, and CRUD operations, styled with Emotion and integrated with a REST API with custom webpack configirations.


## Pre-requisites

Node.js (v16+)

Backend API (e.g., http://localhost:8000/api/songs/ )

## Installation


git clone https://github.com/nebiyuu1954/song-manager-frontend.git

cd song-manager-frontend

```bash
npm install
```

### Running Locally

```bash
npm start
```

Access at http://localhost:8000. 
- you have to sure backend is running and you have added data 

## Testing

```bash
npm test
```

- Uses Jest and React Testing Library to test SongList.js rendering (title, search bar, sort buttons, table headers, pagination).

## Features

- Pagination: 7 songs per page.

- Search: Filter by title, artist, album.

- Sort: Title ascending (?ordering=title) or descending (?ordering=-title).

- CRUD: Add, edit, delete songs via /add, /edit/:id, and trash icon for deletion.

## Webpack Configuration

Custom setup with:

- babel-loader: Transforms JSX/ES6+ (@babel/preset-env, @babel/preset-react).

- style-loader, css-loader: Handles Emotion styles.

- file-loader: Processes SVGs/images.

- environment variables: API\_BASE\_URL from .env.

- dev server: Runs at http://localhost:8080.

## AI Usage

Used AI (Grok) to:

- Generate and Debug Webpack setup, jest-environment-jsdom, TextEncoder errors ,jest.config.js, and setupTests.js.

- Verified via: npm test, npm start, API calls (postman), browser inspection for UI.

## API Endpoints
```http
GET /api/songs/: List songs (?search=, ?ordering=, ?page=, ?perpage=).
```

```http
POST /api/songs/: Create song.
```

```http
GET /PUT/PATCH/DELETE /api/songs/:id/: CRUD for a song.
```

## Dependencies

- react, react-router-dom, redux, @reduxjs/toolkit, redux-saga, axios, @emotion/styled, jest, @testing-library/react, @testing-library/jest-dom.