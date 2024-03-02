import './ProjectTabButton.scss';

import React from 'react';


export default function ProjectTabButton({ name, selectedTab, setSelectedTab }) {
  return (
    <div className={'tab-button' + ((name === selectedTab) ? ' selected' : ' unselected')}
    onClick={() => setSelectedTab(name)}>
        <p className='tab-button-name'>{name}</p>
    </div>
  );
}