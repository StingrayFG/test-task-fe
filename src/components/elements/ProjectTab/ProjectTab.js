import './ProjectTab.scss';

import React from 'react';


export default function ProjectTab({ children }) {
  return (
    <div className='tab'>
        {children ? children : 
        (<p>Select a tab</p>)
        }
    </div>
  );
}