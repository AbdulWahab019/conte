import { Doctor } from '../models/Doctor';

async function doctorsList() {
  const doctors = await Doctor.findAll({ attributes: ['id', 'name', 'position'] });

  return doctors;
}

export { doctorsList };
