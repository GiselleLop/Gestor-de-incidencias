import React, { useState } from 'react';
import './Filter.css';
import { IssueTypeInterface } from './Interfaces';
// Definición de la interfaz FilterProps que describe las props que recibe el componente FilterBar
interface FilterProps { 
     // Función que se llama cuando se aplica un filtro. Recibe el tipo de incidencia seleccionado como argumento
    onFilter: (selectedIssueType: string) => void;   
     // Array que contiene los tipos de incidencia disponibles
    issueTypes: IssueTypeInterface[];
}

function FilterBar({onFilter, issueTypes }: FilterProps) {
    // Estado para almacenar el tipo de incidencia seleccionado
    const [selectedIssueType, setSelectedIssueType] = useState<string>('');
    
  // Función que se llama cuando se aplica un filtro
  const handleFilter = () => {
     // Llama a la función onFilter pasándole el tipo de incidencia seleccionado
    onFilter(selectedIssueType);
};
return (
    <div className="filter-bar">

        <div className="filter-item">
            <label>Selecciona el tipo de incidencia:</label>

            <select onChange={(e) => {setSelectedIssueType(e.target.value)}}>
                <option value="all">Todos</option>
                {issueTypes.map(type => (
                    <option key={type.id} value={type.name}>{type.name}</option>
                ))}
            </select>
            
            <button onClick={handleFilter}>Aplicar filtro</button>  
        </div>
    </div>
);
}

export default FilterBar;
