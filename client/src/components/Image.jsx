import React from 'react';

const Image = ({ src, ...rest }) => {
   src =
    src && src.includes('https://')
      ? src
      : 'http://localhost:4000/uploads/' + src;
  return <img src={src} {...rest} alt={''} />;
};

export default Image;
