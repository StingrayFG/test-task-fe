import './ProjectPage.scss';
import 'components/styles/TableStyles.scss';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

import WeekTableElement from 'components/elements/WeekTableElement/WeekTableElement';


export default function ProjectPage() {
  const { name } = useParams();

  const [project, setProject] = useState();

  const [records, setRecords] = useState();
  const [placeholderDay, setPlaceholderDay] = useState();
  const [weeks, setWeeks] = useState();

  const [areKeysAdded, setAreKeysAdded] = useState();

  useEffect(() => {
    if (!project) {
      const getProject = async () => {
        await axios.get(process.env.REACT_APP_BACKEND_URL + '/project/' + name)
        .then((res) => {
          setProject(res.data);
          //console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
      }
      getProject();
    }
  })

  useEffect(() => {
    if (project) {
      if (!records) {
        parseRecordsToArray();
      } else if (!placeholderDay) {
        getPlaceholderDay();
      } else if (!areKeysAdded && !project.name.includes('tags')) {
        addMissingKeys();
      } else if (!weeks) {
        parseRecordsToWeeks();
      }
    }
  })

  const parseRecordsToArray = () => { 
    let res = [];
    if (project.name.includes('tags')) {
      Object.entries(project.records).forEach(([key, value]) => {
        res.push({ date: new Date(key), data: value, showNames: true })
      });
    } else {
      Object.entries(project.records).forEach(([key, value]) => {
        res.push({ date: new Date(key), data: value, showNames: false })
      });
    }
    setRecords(res);
  }

  const getPlaceholderDay = () => {
    let placeholder = { data: {} };

    for (let i = 0; i < records.length; i++) {
      for(let key in records[i].data) {
        if (!placeholder.data[key] && !(placeholder.data[key] === 0)) {
          placeholder.data[key] = 0;
        }
      }
    }
    setPlaceholderDay(placeholder);
  }

  const addMissingKeys = () => {
    for (let i = 0; i < records.length; i++) {
      records[i].data = Object.assign({}, {...placeholderDay}.data, records[i].data)
    }
    setAreKeysAdded(true);
  }

  const parseRecordsToWeeks = () => { 
    let res = [];

    let firstDayOffset = 0;
    let firstDayName = records[0].date.toString().slice(0, 3);
    if (firstDayName === 'Tue') { firstDayOffset = 1; }
    else if (firstDayName === 'Wed') { firstDayOffset = 2; }
    else if (firstDayName === 'Thu') { firstDayOffset = 3; }
    else if (firstDayName === 'Fri') { firstDayOffset = 4; }
    else if (firstDayName === 'Sat') { firstDayOffset = 5; }
    else if (firstDayName === 'Sun') { firstDayOffset = 6; }
    let firstTableDate = new Date(records[0].date);
    firstTableDate.setDate(firstTableDate.getDate() - firstDayOffset);

    // set columns' names
    let week = {days: []};
    if (!project.name.includes('tags')) {
      week.columns = [];
      Object.entries(placeholderDay.data).forEach(([key, value]) => {
        week.columns.push(key);
      })
    } else {
      week.columns = undefined;
    }

    for (let i = 0; i < (Math.ceil((records.length + firstDayOffset) / 7) * 7); i++) {
      // set week's dates range
      if (!week.from) {
        week.from = new Date(firstTableDate);
        week.from.setDate(week.from.getDate() + 7 * Math.floor(i / 7));

        week.to = new Date(week.from);
        week.to.setDate(week.to.getDate() + 6)
      }

      // push day with data into week's array
      if (((i - firstDayOffset) >= 0 ) && ((i - firstDayOffset) < records.length)) {
        week.days.push(records[i - firstDayOffset]);
      // push day placeholder if no data is given for this day
      } else {
        week.days.push(placeholderDay);
      }

      // push the assembled week object into resulting array
      if (week.days.length === 7) {
        console.log(week)
        res.push(week);
        week = {days: [], columns: week.columns};;
      } 
    }

    setWeeks(res);
  }

  return (
    <div className='main-div'>
      <p className='main-header'>{name}</p>
      {project && 
        <div>
          <p>Distribution: {project.request.distribution}</p>
          <p>Dates: {'from ' + new Date(project.request.filters.from).toString().slice(4, 15) + 
          ' to ' + new Date(project.request.filters.to).toString().slice(4, 15)}</p>
          <p>Groups: </p>
          {project.request.filters.groups.values.map((group) => <p key={group}>{group + ' '}</p>)}

          {weeks && 
            <div className='weeks-table'>
              {weeks.map((week) => (
                <WeekTableElement key={week.from.toString()} week={week}/>
              ))}
            </div>
          }

        </div>
      }
    </div>
  );
}
