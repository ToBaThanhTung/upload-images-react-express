const express = require('express');
const cloudinary = require('cloudinary');
const cors = require('cors');
const path = require ('path');
const formData = require('express-form-data');
// const { CLIENT_ORIGIN } = require('./config');

require('dotenv').config();

const app = express();

// app.use(cors({
//   origin: CLIENT_ORIGIN,
// }));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(formData.parse());

app.get('/init', (req, res) => res.send('ok'));

app.post('/image-upload', (req, res) => {
  
  const values = Object.values(req.files);
  
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  Promise
    .all(promises)
    .then(results => {
      console.log('image uploaded !!!');
            
      res.status(200).json(results);
    })
    .catch(err => res.status(400).json(err));
  
});

app.listen(process.env.PORT || 5000, () => console.log('👍'));