import axios from 'axios';
import md5 from 'md5';

const marvelPrivateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY || '';
const marvelPublicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY || '';

const ts = Number(new Date());
const hash = md5(ts + marvelPrivateKey + marvelPublicKey);

const marvelApi = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  params: {
    ts,
    apikey: marvelPublicKey,
    hash,
  },
});

export default marvelApi;
