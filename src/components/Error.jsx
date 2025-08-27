import React from 'react';

const Error = ({title}) => (
  <div className='w-full flex justify-center items-center'>
      <h1 className="font-bold text-2xl text-white mt-2">{title? title: 'Something went wrong, please try again'}</h1>

    
    </div>
);

export default Error;
