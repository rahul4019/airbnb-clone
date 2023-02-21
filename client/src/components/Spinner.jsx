import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <TailSpin
        height={100}
        width={200}
        color="#f5385d"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
