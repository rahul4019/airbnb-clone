import React from 'react';

const Image = ({ src, ...rest }) => {
   src =
    src && src.includes('https://')
      ? src
      : 'https://airbnb-clone-production.up.railway.app/uploads/' + src;
  return <img src={src} {...rest} alt={''} />;
};

export default Image;
