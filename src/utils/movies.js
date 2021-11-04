
// Gerar uma lista de filmes com tamanho específico 
export function getListMovies(size, movies) {
  let popularMovies = [];

  for (let i = 0, l = size; i < l; i++) {
      popularMovies.push(movies[i])
  }  

  return popularMovies;
}

// Gerar um número aleatório com base no tamanho de uma lista
export function randomBanner(movies) {
  return Math.floor(Math.random() * movies.length)
}