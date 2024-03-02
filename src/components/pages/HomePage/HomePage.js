import './HomePage.scss';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ProjectCard from 'components/elements/ProjectCard/ProjectCard';


export default function HomePage() {
  const [cardNames, setCardNames] = useState();

  useEffect(() => {
    if (!cardNames) {
      const getCards = async () => {
        await axios.get(process.env.REACT_APP_BACKEND_URL + '/projects/all')
        .then((res) => {
          setCardNames(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
      }
      getCards();
    }
  })

  return (
    <div className='main-div'>
      <p className='main-header'>Projects</p>
      <div className='main-cards-div'>
        {cardNames && 
          (cardNames.map((card) => (
            <ProjectCard key={card} name={card}/>
          )))
        }
      </div> 
    </div>
  );
}
