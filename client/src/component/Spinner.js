import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFootballBall } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
const Spinner = () => {
  return (
    <div className='spinner fadein'>
      <FontAwesomeIcon icon={faFootballBall} size='5x' color='#3V5998' />
    </div>
  );
};

export default Spinner;