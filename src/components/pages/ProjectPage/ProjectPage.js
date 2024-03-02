import './ProjectPage.scss';
import 'components/styles/TableStyles.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import WeekTableElement from 'components/elements/WeekTableElement/WeekTableElement';

export default function HomePage() {
  const ex2 = {
        "name": "total-chats-report",
        "request": {
            "distribution": "day",
            "filters": {
                "from": "2024-01-01T02:00:00+02:00",
                "to": "2024-01-14T02:00:00+02:00",
                "groups": {
                    "values": [
                        1,
                        2,
                        3
                    ]
                }
            }
        },
        "total": 10399,
        "records": {
            "2024-01-03": {
                "total": 815
            },
            "2024-01-04": {
                "total": 806
            },
            "2024-01-05": {
                "total": 721
            },
            "2024-01-06": {
                "total": 735
            },
            "2024-01-07": {
                "total": 742
            },
            "2024-01-08": {
                "total": 839
            },
            "2024-01-09": {
                "total": 766
            },
            "2024-01-10": {
                "total": 752
            },
            "2024-01-11": {
                "total": 807
            },
            "2024-01-12": {
                "total": 866
            },
            "2024-01-13": {
                "total": 895
            },
        }
  }

  const ex = {
        "name": "duration-report",
        "request": {
            "distribution": "day",
            "filters": {
                "from": "2024-01-01T02:00:00+02:00",
                "to": "2024-01-14T02:00:00+02:00",
                "groups": {
                    "values": [
                        1,
                        2,
                        3
                    ]
                }
            }
        },
        "total": 10399,
        "records": {
            "2024-01-01": {
                "agents_chatting_duration": 407,
                "count": 760,
                "duration": 590
            },
            "2024-01-02": {
                "agents_chatting_duration": 394,
                "count": 819,
                "duration": 560
            },
            "2024-01-03": {
                "agents_chatting_duration": 396,
                "count": 815,
                "duration": 556
            },
            "2024-01-04": {
                "agents_chatting_duration": 444,
                "count": 806,
                "duration": 593
            },
            "2024-01-05": {
                "agents_chatting_duration": 420,
                "count": 721,
                "duration": 565
            },
            "2024-01-06": {
                "agents_chatting_duration": 381,
                "count": 735,
                "duration": 531
            },
            "2024-01-07": {
                "agents_chatting_duration": 385,
                "count": 742,
                "duration": 556
            },
            "2024-01-08": {
                "agents_chatting_duration": 461,
                "count": 839,
                "duration": 633
            },
            "2024-01-09": {
                "agents_chatting_duration": 470,
                "count": 766,
                "duration": 629
            },
            "2024-01-10": {
                "agents_chatting_duration": 385,
                "count": 752,
                "duration": 532
            },
            "2024-01-11": {
                "agents_chatting_duration": 438,
                "count": 807,
                "duration": 591
            },
            "2024-01-12": {
                "agents_chatting_duration": 388,
                "count": 866,
                "duration": 528
            },
            "2024-01-13": {
                "agents_chatting_duration": 456,
                "count": 895,
                "duration": 612
            },
            "2024-01-14": {
                "agents_chatting_duration": 410,
                "count": 76,
                "duration": 535
            }
        }
  }



  const { name } = useParams();

  const [records, setRecords] = useState();
  const [weeks, setWeeks] = useState();

  useEffect(() => {
    if (!records) {
      parseRecordsToArray();
    } else if (!weeks) {
      parseRecordsToWeeks();
    }
  })

  const parseRecordsToArray = () => { 
    let res = [];
    Object.entries(ex.records).forEach(([key, value]) => {
      res.push({ date: new Date(key), data: value})
    });
    setRecords(res);
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

    let week = {days: []};
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

        // set week's columns from the first day with data
        if (!week.columns) {
          let columns = []
          Object.entries(records[i].data).forEach(([key, value]) => {
            columns.push(key);
          })
          week.columns = columns;
        }
      // push day placeholder if no data is given for this day
      } else {
        week.days.push({...records[0], date: ''})
      }

      // push the assembled week object into resulting array
      if (week.days.length === 7) {
        res.push(week);
        week = {days: []};
      } 
    }

    setWeeks(res);
  }

  return (
    <div className='main-div'>
      <p className='main-header'>{name}</p>
      <div>
        <p>Distribution: {ex.request.distribution}</p>
        <p>Dates: {'from ' + new Date(ex.request.filters.from).toString().slice(4, 15) + 
        ' to ' + new Date(ex.request.filters.to).toString().slice(4, 15)}</p>
        <p>Groups: {ex.request.filters.groups.values.map((group) => <>{group + ' '}</>)} </p>
        {weeks && 
          <div className='weeks-table'>
            {weeks.map((week) => (
              <WeekTableElement key={week.from} week={week}/>
            ))}
          </div>
        }

      </div>

    </div>
  );
}
