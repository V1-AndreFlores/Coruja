import AsyncStorage from '@react-native-async-storage/async-storage';

// Buscar os Filmes salvos
export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key);

  const moviesSave = JSON.parse(myMovies) || [];

  return moviesSave;
}

// Salvar um novo Filme
export async function saveMovie(key, newMovie) {
  const moviesStored = await getMoviesSave(key);

  // Se tiver algum filme salvo com o mesmo ID ou duplicado precisamos ignorar.
  const hasMovie = moviesStored.some((item) => item.id === newMovie.id);

  if (hasMovie) {
    return;
  }

  moviesStored.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
}

// Deletar um Filme específico
export async function deleteMovie(id) {
  const moviesStored = await getMoviesSave('@primereact');

  const myMovies = moviesStored.filter((item) => item.id !== id);

  await AsyncStorage.setItem('@primereact', JSON.stringify(myMovies));

  return myMovies;
}

// Filtrar um Filme salvo
export async function hasMovie(movie) {
  const moviesStored = await getMoviesSave('@primereact');

  const hasMovie = moviesStored.find((item) => item.id === movie.id);

  if (hasMovie) {
    return true;
  }

  return false;
}
