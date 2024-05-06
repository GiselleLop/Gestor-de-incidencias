import axios from 'axios';
import { NewIssueData, updateStatusInterface } from '../Interfaces';

export const api = axios.create({
    baseURL:'https://api-issues.onrender.com',
    timeout: 60000
})

// Función para agregar una nueva issue
export async function addIssue(data: NewIssueData) {
    try {
       const response = await api.post('/issues', data);
       return response.data;
    } catch (error) {
       console.error('Error adding issue:', error);
       throw error;
    }
 }


 // Función para actualizar statusde una issue
export async function updateStatusOfIssue(data: updateStatusInterface) {
   try {
      const response = await api.put('/issues', data);
      console.log('Issue actualizada');
      return response.data;
   } catch (error) {
      console.error('Error adding issue:', error);
      throw error;
   }
}