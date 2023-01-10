import React, { ReactElement } from 'react';

import './Loader.css';

export default function Loader(): ReactElement {
  return (
    <div className="pre-loader">
      <div className="loader" />
    </div>
  );
}
