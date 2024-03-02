import './ProjectTab.scss';

import React from 'react';


export default function ProjectCard({ children, name }) {
  return (
    <div className='tab'>
        {children ? children : 
        (<p>Select a tab</p>)
        }
    </div>
  );
}