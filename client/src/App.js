import React, { Component } from 'react';
import Spinner from './component/Spinner';
import Images from './component/Images';
import Button from './component/Button';
import config from './config';
import Init from './Init'
import Notifications, {notify} from 'react-notify-toast';
import './App.css';

const toastColor = { 
  background: '#505050', 
  text: '#fff' 
}


class App extends Component {

  state = {
    loading: true,
    upLoading: false,
    images: [],
  };


  componentDidMount() {
    fetch(`${config.API_URL}/init`)
      .then(res => {
        if (res.ok) {
          return this.setState({ loading: false })  
        }
        const msg = 'Something is went wrong with Heroku' 
        this.toast(msg, 'custom', 2000, toastColor)
      })
  }


  toast = notify.createShowQueue();

  onChange = e => {
    const errs = [];
    // console.log(e.target.files);
    
    const files = Array.from(e.target.files);
    console.log(files);
    
    
    if(files.length > 3) {
      const msg = 'Only 3 images can be upload at a time';
      return this.toast(msg, 'custom', 2000, toastColor);
    }
    
    const types =['image/png', 'image/jpeg', 'image/gif'];
    const formData = new FormData();

    files.forEach((file, i) => {
      if(types.every(type => file.type !== type)) {
        errs.push(`${file.type} is nost a supportes format`);
      }
      if(file.size > 150000) {
        errs.push(`${file.name} is too large!`)
      }
      formData.append(i, file);
    });
   
    if(errs.length > 0) {
      return errs.forEach(err => this.toast(err, 'custom', 2000, toastColor));
    }
    this.setState({upLoading: true});

    console.log(formData);
    

    fetch(`${config.API_URL}/image-upload`, {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(images =>{
      this.setState({
        upLoading: false,
        images
      });
    })
    .catch(err => 
      console.log(err)
    );
  };

  removeImage = (id) => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    });
  };

 
  onError = id => {
    this.toast('Oops, something went wrong', 'custom', 2000, toastColor)
    this.setState({ images: this.filter(id) })
  }


  render() {
    
    const {upLoading, images, loading} = this.state;

    console.log('length', images.length);
    
    const content = () => {
      switch(true) {
        case loading:
          return <Init />
        case upLoading: 
          return <Spinner />
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} />
        default: 
          return <Button onChange={this.onChange} />
      }
    }
    return (
      <div className='container'>
        <Notifications />
        <div className='buttons'>
          {content()}
        </div>
      </div>
    );
  }
}

export default App;
