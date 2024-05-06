export interface IssueTypeInterface {
    id: number;
    name: string;
  }
  
  export interface LocationInterface {
    id: number;
    name: string;
  }
  
  
export interface NewIssueData {
  issue_type_id: number;
  location_id: number;
  title: string;
  description: string;
  date: string;
}
  
  export interface IssueInterfaceForGET{
    id: number;
    location_id: number;
    issue_type_id: number;
    title: string;
    description: string;
    status: boolean;
    date: Date;
    location_name:string;
    issue_type_name: string;

  }
    
  export interface updateStatusInterface{
    id: number;
    status: boolean;
    
  }