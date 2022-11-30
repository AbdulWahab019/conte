import { GenericResponse } from '../api/api.model';

export interface GetAllSurgeriesByDoctorAPIResponse extends GenericResponse {
  data: GetAllSurgeriesByDoctor;
}

export interface GetAllSurgeriesByDoctor {
  id: number;
  name: string;
}
