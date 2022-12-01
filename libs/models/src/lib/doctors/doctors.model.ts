import { GenericResponse } from '../api/api.model';

export interface GetAllDoctorsAPIResponse extends GenericResponse {
  data: GetAllDoctors[];
}

export interface GetAllDoctors {
  id: number;
  name: string;
  position: string;
}
