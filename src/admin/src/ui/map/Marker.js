import React from 'react';

export const style1 = ({ rotate, onClick }) => (
  <div
    style={{
      backgroundColor: '#7ba6ec',
    }}
    onClick={onClick}
  >
    <div
      style={{
        width: 70,
        height: 70,
        transform: `rotate(${rotate})`,
        backgroundSize: 'contain',
        backgroundImage: 'url(images/marker-1.png)',
      }}
    />
  </div>
);

export const style2 = ({ rotate, onClick }) => (
  <div
    style={{
      backgroundColor: '#7ba6ec',
    }}
    onClick={onClick}
  >
    <div
      style={{
        width: 70,
        height: 70,
        transform: `rotate(${rotate})`,
        backgroundSize: 'contain',
        backgroundImage: 'url(images/marker-2.png)',
      }}
    />
  </div>
);
