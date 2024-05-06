import React, {useState, useEffect} from 'react';
import './Admin.css'
import FilterBar from './Filter';
import { api } from './services/apiService';
import Issues from './Issues';
import { IssueTypeInterface, IssueInterfaceForGET} from './Interfaces';

function Admin() {
  const [issues, setIssues] = useState<IssueInterfaceForGET[]>([]);
  const [originalIssues, setOriginalIssues] = useState<IssueInterfaceForGET[]>([]);
  const [issueTypes, setIssueTypes] = useState<IssueTypeInterface[]>([]);

 // Función para manejar el filtro seleccionado
  const handleFilter = async (selectedIssueType: string) => {
  console.log(selectedIssueType);
  if(selectedIssueType === 'all') {
    setIssues(originalIssues);
  } else {

    const filteredIssues = originalIssues.filter(issue => issue.issue_type_name === selectedIssueType);
      setIssues(filteredIssues);
  }
  
};
  
   
  const getAllIssues = async () => {
    const {data} = await api.get<IssueInterfaceForGET[]>('/issues');
    setIssues(data)
    setOriginalIssues(data);
  };
  const getIssuesType = async () => {
    const {data} = await api.get('/issue_types');
    setIssueTypes(data)
  };

//cuando el componente se inicia
  useEffect(() => {
    getIssuesType()
    getAllIssues()
 }, []);

  return (
  <div>
    <ul>
      <li>
        <div className=' circlePending'>
        </div>  
        <h1>Pendiente</h1>
      </li>
      
      <li>
        <div className='circleCompete'>
        </div>
        <h1>Completado</h1>
      </li>
    </ul>
    <FilterBar onFilter={handleFilter} issueTypes={issueTypes} /> 

    <Issues issues={issues}/>

  </div>
  );
}

export default Admin;
