
const api = process.env.NODE_ENV === 'production' ? 'https://store-image.herokuapp.com' : 'http://localhost:5000';

const config = ({
  API_URL: api,
});

export default config;