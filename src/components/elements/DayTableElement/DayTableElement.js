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

      {Object.entries(day.data).map(([key, value], index) => (
        <div className={'week-day-row' + ' row-color-' + index % 4 + (hoveredName === key ? ' week-day-row-hovered' : '')} 
        onMouseEnter={() => setHoveredName(key)} onMouseLeave={()=> setHoveredName('')}><p>
          {day.showNames && (
            (hoveredName === key) ?
            key + ': '
            :
            truncateName(key) + ': '
          )}
          {day.date && (value)}
        </p></div>
      ))}

    </div>
  );
}
