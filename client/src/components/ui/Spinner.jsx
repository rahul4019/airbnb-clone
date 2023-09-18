import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="absolute inset-1/2 flex flex-col items-center justify-center">
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
