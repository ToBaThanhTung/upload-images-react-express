import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faFileImage } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
const Button = (props) => {
  const { onChange } = props;
  return (
    <div className='button fadein'>
      <div className='button'>
        <label htmlFor='single'>
          <FontAwesomeIcon icon={faFileImage} color='#3m398' size='10x'title='upload single'/>

        </label>
        <input type='file' id='single' onChange={onChange} />

      </div>

       <div className='button'>
        <label htmlFor='multi'>
          <FontAwesomeIcon icon={faImages} color='#6d84c4' size='10x' title='upload multiple'/>
        </label>
        <input type='file' id='multi' onChange={onChange} multiple />
        
      </div>
    </div>
  );
};

export default Button;