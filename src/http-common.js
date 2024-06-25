import axios from 'axios';

export default axios.create({
  baseURL: 'https://localhost:7054/api/Pessoas',
  headers: {
    'Content-type': 'application/json'
  }
});