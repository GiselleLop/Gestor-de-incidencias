import React, { useState, useEffect } from 'react';
import './Resident.css';
import { api } from './services/apiService';
import { addIssue } from './services/apiService';
import { LocationInterface, IssueTypeInterface } from './Interfaces';

function Resident() {

  const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; 

  const [issueTypes, setIssueTypes] = useState<IssueTypeInterface[]>([]);
  const [locations, setLocation] = useState<LocationInterface[]>([]);
  const [formData, setFormData] = useState({
    location_id: 0,
    issue_type_id: 0,
    title: '',
    description: '',
    date: formattedDate
  });
  
  const getLocations = async () => {
    const {data} = await api.get('/locations');
    console.log(data, 'location fron resident');
    setLocation(data)
  };

  const getIssuesType = async () => {
    const {data} = await api.get('/issue_types');
    console.log(data, 'issues');
    setIssueTypes(data)
  };


  useEffect(() => {
    getLocations();
    getIssuesType()
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    if (formData.title === '' || formData.description === '' || formData.issue_type_id === 0 ||  formData.location_id === 0 ) {
      alert('Por favor completar todos los campos')
      return
    }
    addIssue(formData)
      .then(() => {
       alert('Incidencia enviada exitosamente')
       return
      })
      .catch((error) => {
        alert('Error al enviar incidencia')
        console.error('Error al crear la incidencia:', error);
      });
};




  return (
    <div className='issueRegisterContainer'>  
      <p>Por favor registra tu incidencia:</p>
  <form id="incident_claim_form" onSubmit={handleSubmit}>
  <div className="columnDiv">
    <label className="required" htmlFor="title">Título de la incidencia</label>
    <input id="title" className="input" name="title" type="text" onChange={handleChange}  value={formData.title} />
  </div>

  <div className="columnDiv">
    <label className="description" htmlFor="description">Descripción de la incidencia:</label>
    <input id="description" className="input" name="description" type="text"  value={formData.description} onChange={handleChange}/>
  </div>

<div className="DivRow">
          <label htmlFor="location">Selecciona la ubicación de la incidencia:</label>
          <select
            id="location"
            className="input"
            name="location_id"
            value={formData.location_id}
            onChange={handleChange}
          >
            <option value=""></option>
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>


        <div className="DivRow">
          <label htmlFor="issueType">Selecciona el tipo de incidencia:</label>
          <select
            id="issueType"
            className="input"
            name="issue_type_id"
            value={formData.issue_type_id}
            onChange={handleChange}
          >
            <option value=""></option>
            {issueTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>



    <input id="submit_button" type="submit" value="Enviar incidencia" />
</form>
    </div>
  );
}

export default Resident;
