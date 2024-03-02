import 'components/styles/TableStyles.scss';
import React, { useEffect, useState } from 'react';
import DayTableElement from 'components/elements/DayTableElement/DayTableElement';

export default function WeekTableElement({ week }) {
  return (
    <div className='week-row'>
      <div className='week-dates-cell'>
        <p>{week.from.toString().slice(4, 15) + ' - ' + week.to.toString().slice(4, 15)}</p>
      </div>
      
      {week.columns && 
        <div className='week-fields-cell'>
          <div className='week-field-row'><p>Field</p></div>
          {week.columns.map((column, index) => (
            <div className={'week-field-row' + ' row-color-' + index % 4}><p>{column}</p></div>
          ))}
        </div>
      }


      <div className='week-days-cell'>
        {week.days.map((day) => (
          <DayTableElement key={day.date} day={day}/>
        ))}
      </div>

    </div>
  );
}
