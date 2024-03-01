import './ProjectCard.scss';
import React from 'react';
import { Link } from 'react-router-dom';


export default function ProjectCard({ name }) {
  return (
    <Link className='card-div' to={'/project/' + name}>
      {name}
    </Link>
  );
}
