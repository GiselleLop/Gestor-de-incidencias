import React, {useState, useEffect} from 'react';
import './Issues.css';
 import { IssueInterfaceForGET } from './Interfaces';
 import { updateStatusOfIssue } from './services/apiService';

 function Issues({ issues }: { issues: IssueInterfaceForGET[] }) {
  const [localIssues, setLocalIssues] = useState<IssueInterfaceForGET[]>([]);

  useEffect(() => {
    setLocalIssues(issues); // Inicialmente, establecer las incidencias locales como las recibidas por props
  }, [issues]); // Actualizar localIssues cuando las incidencias cambien

  const handleUpdateStatus = async (id: number, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      await updateStatusOfIssue({ id, status: newStatus });

      // Actualizar el estado local de las incidencias después de la actualización
      const updatedIssues = localIssues.map(issue => {
        if (issue.id === id) {
          return { ...issue, status: newStatus };
        }
        return issue;
      });
      setLocalIssues(updatedIssues);
    } catch (error) {
      console.error('Error al actualizar el estado de la incidencia:', error);
    }
  };

  return (
    <div className='issueContainer'>
      {localIssues.length === 0 ? (
        <h1>No hay incidencias</h1>
      ) : (
        localIssues.map(issue => (
          <div className='issue' key={issue.id}>
            <div className='containerOftitleAndDescription'>
              <h1 className='titleIssue'>{issue.title}</h1>
              <p className='descriptionIssue'>{issue.description}</p>
              <div className={issue.status ? 'complete' : 'pending'}></div>
            </div>
            
            <div className='issueDetails'>
              <p>Tipo de incidencia: {issue.issue_type_name}</p>
              <p>Locación: {issue.location_name}</p>
            </div>
          
            <button className={issue.status ? 'buttonToPending' : 'buttonToComplete'}
              onClick={() => handleUpdateStatus(issue.id, issue.status)}>
              {issue.status ? 'Marcar como pendiente' : 'Marcar como completado'}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Issues;

