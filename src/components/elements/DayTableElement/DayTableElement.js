import 'components/styles/TableStyles.scss';

import React, { useEffect, useState } from 'react';


export default function DayTableElement({ day }) {
  const [hoveredName, setHoveredName] = useState();

  const truncateName = (name) => {
    if (name.length > 11) {
      return name.slice(0,9) + '..';
    } else {
      return name;
    }
  }

  return (
    <div className='week-fields-cell'>
      <div className='week-field-row'><p>
        {day.date && (day.date.toString().slice(4, 10))}
      </p></div>

      {Object.entries(day.data).map(([name, value], index) => (
        <div key={name} className={'week-day-row' + ' row-color-' + index % 4 + (hoveredName === name ? ' week-day-row-hovered' : '')} 
        onMouseEnter={() => setHoveredName(name)} onMouseLeave={()=> setHoveredName('')}><p>
          {day.showNames && (
            (hoveredName === name) ?
            name + ': '
            :
            truncateName(name) + ': '
          )}
          {day.date && (value)}
        </p></div>
      ))}

    </div>
  );
}
