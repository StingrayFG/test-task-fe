import './ProjectPage.scss';
import 'components/styles/TableStyles.scss';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

import WeekTableElement from 'components/elements/WeekTableElement/WeekTableElement';
import ProjectTable from 'components/elements/ProjectTable/ProjectTable';
import ProjectTab from 'components/elements/ProjectTab/ProjectTab';
import ProjectTabButton from 'components/elements/ProjectTabButton/ProjectTabButton';

export default function ProjectPage() {
  const { name } = useParams();

  const [project, setProject] = useState();

  useEffect(() => { // fetch the project
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

  const [selectedTab, setSelectedTab] = useState();

  return (
    <div className='main-div'>
      <p className='main-header'>{name}</p>
      <div className='tab-buttons-div'>
        <ProjectTabButton name={'Table'} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <ProjectTabButton name={'Nav 1'} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <ProjectTabButton name={'Nav 2'} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <ProjectTabButton name={'Nav 3'} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      
      <ProjectTab>
        {(selectedTab === 'Table') ? (
          project && (
            <ProjectTable project={project}/>
          )
        ) : 
        (
          (selectedTab) && (
            <p>{selectedTab}</p>
          )
        )} 
      </ProjectTab>

    </div>
  );
}
