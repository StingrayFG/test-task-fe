import 'components/styles/TableStyles.scss';
import React, { useEffect, useState } from 'react';

export default function DayTableElement({ day }) {

  return (
    <div className='week-fields-cell'>
      <div className='week-field-row'><p>
        {day.date && (day.date.toString().slice(4, 10))}
      </p></div>

      {Object.entries(day.data).map(([key, value], index) => (
        <div className={'week-field-row' + ' row-color-' + index % 4}><p>
          {day.date && (value)}
        </p></div>
      ))}

    </div>
  );
}
