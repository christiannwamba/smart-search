import React from 'react';
import './ImageList.css';

export default ({ hit }) => {
  return (
    <div className="card">
      <div className="card-content">
        <img src={hit.secure_url} alt={hit.description} />
        <p>{hit.description}</p>
      </div>
    </div>
  );
};
