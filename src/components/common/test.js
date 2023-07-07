import React from 'react';
import image1 from '../../assets/image/original_new.png';
import image2 from '../../assets/image/p1_new.png';
import image3 from '../../assets/image/p2_i.png';
import image4 from '../../assets/image/p2_ii.png';
import image5 from '../../assets/image/star_new.png';
import { Parallax } from 'react-parallax';
import './test.css'

const test = () => {
  return (
    <div>

    <Parallax
      bgImage={image1} // Replace with your image source
      strength={500}
      style={{ height: '500px' }}
      className='parallax-section'
    >
      <div style={{ height: '100%' }}>
        <h1>Image 1 Content</h1>
      </div>
    </Parallax>
    <Parallax
      bgImage={image2} // Replace with your image source
      strength={500}
      style={{ height: '500px' }}
      className='parallax-section'
    >
      <div style={{ height: '100%' }}>
        <h1>Image 2 Content</h1>
      </div>
    </Parallax>
    <Parallax
      bgImage={image3}// Replace with your image source
      strength={500}
      style={{ height: '500px' }}
      className='parallax-section'
    >
      <div style={{ height: '100%' }}>
        <h1>Image 3 Content</h1>
      </div>
    </Parallax>
    <Parallax
      bgImage={image4} // Replace with your image source
      strength={500}
      style={{ height: '500px' }}
      className='parallax-section'
    >
      <div style={{ height: '100%' }}>
        <h1>Image 4 Content</h1>
      </div>
    </Parallax>
    <Parallax
      bgImage={image5} // Replace with your image source
      strength={500}
      style={{ height: '500px' }}
      className='parallax-section'
    >
      <div style={{ height: '100%' }}>
        <h1>Image 5 Content</h1>
      </div>

    </Parallax>
  </div>
  );
};

export default test;
