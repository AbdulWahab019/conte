import { Doctor } from '../models/Doctor';

export async function getDoctors() {
  return await Doctor.findAll({ attributes: ['id', 'name', 'position'] });
}
