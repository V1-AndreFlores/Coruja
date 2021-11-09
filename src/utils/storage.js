import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage.clear();

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
  const moviesStored = await getMoviesSave('@coruja');

  const myMovies = moviesStored.filter((item) => item.id !== id);

  await AsyncStorage.setItem('@coruja', JSON.stringify(myMovies));

  return myMovies;
}

// Filtrar um Filme salvo
export async function hasMovie(movie) {
  const moviesStored = await getMoviesSave('@coruja');

  const hasMovie = moviesStored.find((item) => item.id === movie.id);

  if (hasMovie) {
    return true;
  }

  return false;
}

// Buscar o total Favoritos salvos
export async function getFavoritesSave(key) {
  const myFavorites = await AsyncStorage.getItem(key);

  // console.log(
  //   `${key}: (${
  //     myFavorites === 'NaN' || myFavorites === null ? '0' : myFavorites
  //   })`,
  // );

  return myFavorites === 'NaN' || myFavorites === null ? '0' : myFavorites;
}

// Salvar o total Favoritos
export async function saveFavorites(key, number) {
  const favoritesSaveStored = await getFavoritesSave(key);

  const total = parseInt(favoritesSaveStored) + parseInt(number);

  // console.log(`${key}: (${total})`);

  await AsyncStorage.setItem(key, String(total < 0 ? 0 : total));
}
