import axios from 'axios';

// URL FILMES EM CARTAZ
// https://api.themoviedb.org/3/movie/now_playing?api_key=af05b7307a9e44da68d05ca1e10df707&language=pt-BR&page=1

// URL FILMES EM CARTAZ
// https://api.themoviedb.org/3/tv/popular?api_key=af05b7307a9e44da68d05ca1e10df707&language=pt-BR&page=1
// https://api.themoviedb.org/3/tv/60735?api_key=af05b7307a9e44da68d05ca1e10df707&language=pt-BR&page=1

export const keyTheMovieDB = 'af05b7307a9e44da68d05ca1e10df707';

const apiTheMovieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default apiTheMovieDB;
