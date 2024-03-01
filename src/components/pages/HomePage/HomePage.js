import './HomePage.scss';
import React from 'react';
import ProjectCard from 'components/elements/ProjectCard/ProjectCard';

export default function HomePage() {
  const cardNames = ['total-chats-report', 'duration-report']
  return (
    <div className='main-div'>
      <p className='main-header'>Projects</p>
      <div className='main-cards-div'>
        {cardNames.map((card) => (
          <ProjectCard key={card} name={card}/>
        ))}
      </div> 
    </div>
  );
}
