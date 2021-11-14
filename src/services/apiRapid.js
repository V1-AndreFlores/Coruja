import axios from 'axios';

// https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/

export const keyRapid = 'c1eb980d1cmsh81523eb67d5afb2p14cef5jsn2c41f8df6f0d';

const apiRapid = axios.create({
  baseURL: 'https://streaming-availability.p.rapidapi.com/get/basic',
});

export default apiRapid;
