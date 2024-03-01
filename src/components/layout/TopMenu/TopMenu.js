import './TopMenu.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export default function TopMenu() {
  return (
    <div className='top-menu-div'>
        <Link className='top-menu-link' to={'/'}>Home</Link>
    </div>
  );
}
