const express = require('express');
const cloudinary = require('cloudinary');
const cors = require('cors');
const path = require ('path');
const formData = require('express-form-data');
const morgan = require('morgan');
// const { CLIENT_ORIGIN } = require('./config');

require('dotenv').config();

const app = express();

// app.use(cors({
//   origin: CLIENT_ORIGIN,
// }));


if(process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(cors());




app.use(formData.parse());
app.use(morgan('dev'));
app.get('/init', (req, res) => res.send('ok'));

app.get('/images-getall', (req, res) => {
    console.log('testttttt');
    
    cloudinary.v2.api.resources({ type: 'upload' }, (err, results) => {
      console.log('err', err);
      console.log('res', results);
      if(err) return res.status(400).json(err);
      return res.status(200).json(results);
    });
});

app.post('/image-upload', (req, res) => {
  console.log('testttttttttttt up');
  
  const values = Object.values(req.files);
  
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  Promise
    .all(promises)
    .then(results => {
      console.log('image uploaded !!!');
            
      res.status(200).json(results);
    })
    .catch(err => {
      console.log(err);

      res.status(400).json(err)
      
    });
  
});



app.listen(process.env.PORT || 5000, () => console.log('👍'));