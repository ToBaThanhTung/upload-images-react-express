
const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

const config = ({
  API_URL: api,
});

export default config;